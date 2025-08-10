/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

import { InferenceClient } from "@huggingface/inference"
import { type NextRequest, NextResponse } from "next/server"

const client = new InferenceClient(process.env.HF_TOKEN)

// Hard cap to stay within serverless execution limits (override via env)
const GENERATION_TIMEOUT_MS = Number(process.env.VIDEO_TIMEOUT_MS ?? 60000)
const MAX_FRAMES = 16
const MIN_FRAMES = 4

export async function POST(request: NextRequest) {
  const start = Date.now()
  try {
    const { prompt, model, duration } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    if (!process.env.HF_TOKEN) {
      return NextResponse.json({ error: "Hugging Face token not configured" }, { status: 500 })
    }

    // Basic duration -> frame mapping (fallback to frames constraint)
    let requestedFrames = typeof duration === "number" ? duration : 5
    if (!Number.isFinite(requestedFrames) || requestedFrames <= 0) requestedFrames = 5
    requestedFrames = Math.round(requestedFrames)
    if (requestedFrames > MAX_FRAMES) {
      // Prevent long jobs that risk 504
      return NextResponse.json({
        error: `Requested duration too large. Max allowed frames: ${MAX_FRAMES}. Received: ${requestedFrames}.`
      }, { status: 400 })
    }
    if (requestedFrames < MIN_FRAMES) requestedFrames = MIN_FRAMES

    // Check if textToVideo method exists
    if (typeof client.textToVideo !== "function") {
      return NextResponse.json({ error: "Video generation not supported by this client version" }, { status: 501 })
    }

    // Timeout / abort handling to avoid upstream 504
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), GENERATION_TIMEOUT_MS)

    let videoBlob: Blob | ArrayBuffer
    try {
      videoBlob = await client.textToVideo({
        model: model || "Wan-AI/Wan2.1-T2V-14B",
        inputs: prompt,
        parameters: {
          num_frames: requestedFrames,
        },
        // @ts-ignore: pass signal if client forwards to fetch
        signal: controller.signal,
      })
    } catch (err: any) {
      if (err?.name === "AbortError") {
        return NextResponse.json({
          error: `Video generation exceeded ${GENERATION_TIMEOUT_MS}ms and was aborted to prevent a 504. Try reducing duration or frames.`
        }, { status: 504 })
      }
      throw err
    } finally {
      clearTimeout(timeoutId)
    }

    // Convert blob to buffer if needed
    const buffer = videoBlob instanceof ArrayBuffer ? videoBlob : await videoBlob.arrayBuffer()

    // Return the video blob directly
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="generated-video.mp4"',
        "X-Generation-Time-ms": String(Date.now() - start),
        "X-Frames": String(requestedFrames),
      },
    })
  } catch (error) {
    console.error("Error generating video:", error)

    // Handle specific Hugging Face errors
    if (error instanceof Error) {
      if (error.message.includes("rate limit")) {
        return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
      }
      if (error.message.toLowerCase().includes("model")) {
        return NextResponse.json({ error: "Model not available. Please try a different model." }, { status: 503 })
      }
      if (error.message.includes("not supported") || error.message.includes("textToVideo")) {
        return NextResponse.json({ error: "Video generation not supported. Please check your Hugging Face client version." }, { status: 501 })
      }
    }

    return NextResponse.json({ error: "Failed to generate video. Please try again." }, { status: 500 })
  }
}
