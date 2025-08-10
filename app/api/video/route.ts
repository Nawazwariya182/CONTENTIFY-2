/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

import { InferenceClient } from "@huggingface/inference"
import { type NextRequest, NextResponse } from "next/server"

const client = new InferenceClient(process.env.HF_TOKEN)

export async function POST(request: NextRequest) {
  try {
    const { prompt, model, duration } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    if (!process.env.HF_TOKEN) {
      return NextResponse.json({ error: "Hugging Face token not configured" }, { status: 500 })
    }

    // Check if textToVideo method exists
    if (typeof client.textToVideo !== 'function') {
      return NextResponse.json({ error: "Video generation not supported by this client version" }, { status: 501 })
    }

    // Generate video using Hugging Face
    const videoBlob = await client.textToVideo({
      model: model || "ali-vilab/text-to-video-ms-1.7b",
      inputs: prompt,
      parameters: {
        num_frames: Math.min(duration || 5, 16),
      },
    })

    // Convert blob to buffer if needed
    const buffer = videoBlob instanceof ArrayBuffer ? videoBlob : await videoBlob.arrayBuffer()

    // Return the video blob directly
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="generated-video.mp4"',
      },
    })
  } catch (error) {
    console.error("Error generating video:", error)

    // Handle specific Hugging Face errors
    if (error instanceof Error) {
      if (error.message.includes("rate limit")) {
        return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
      }
      if (error.message.includes("model")) {
        return NextResponse.json({ error: "Model not available. Please try a different model." }, { status: 503 })
      }
      if (error.message.includes("not supported") || error.message.includes("textToVideo")) {
        return NextResponse.json({ error: "Video generation not supported. Please check your Hugging Face client version." }, { status: 501 })
      }
    }

    return NextResponse.json({ error: "Failed to generate video. Please try again." }, { status: 500 })
  }
}
