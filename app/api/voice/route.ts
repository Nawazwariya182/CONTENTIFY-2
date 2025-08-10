/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { voiceId, language, text } = await request.json()

    // Using Google Cloud Text-to-Speech API
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_CLOUD_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode:
              language === "en" ? "en-US" : language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-US",
            name: voiceId,
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: 1.0,
            pitch: 0.0,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error("Failed to generate voice demo")
    }

    const data = await response.json()
    const audioBuffer = Buffer.from(data.audioContent, "base64")

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Error generating voice demo:", error)
    return NextResponse.json({ error: "Failed to generate voice demo" }, { status: 500 })
  }
}
