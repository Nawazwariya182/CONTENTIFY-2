/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

import { type NextRequest, NextResponse } from "next/server"

interface AudioSegment {
  audioContent: string
  speaker: string
  text: string
}

export async function POST(request: NextRequest) {
  try {
    const { script, speaker1, speaker2, language } = await request.json()

    // Parse script into speaker lines
    const lines = script.split("\n").filter((line: string) => line.trim())
    const audioSegments: AudioSegment[] = []

    for (const line of lines) {
      if (line.trim()) {
        const [speakerName, ...dialogue] = line.split(":")
        const text = dialogue.join(":").trim()

        if (text) {
          const isFirstSpeaker = speakerName.trim() === speaker1.name
          const voiceId = isFirstSpeaker ? speaker1.voice : speaker2.voice

          // Generate TTS for this line
          const ttsResponse = await fetch(
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
                  speakingRate: 0.9,
                  pitch: 0.0,
                },
              }),
            },
          )

          if (ttsResponse.ok) {
            const ttsData = await ttsResponse.json()
            audioSegments.push({
              audioContent: ttsData.audioContent,
              speaker: speakerName.trim(),
              text,
            })
          }
        }
      }
    }

    // Combine audio segments using Web Audio API approach
    const combinedAudio = await combineAudioSegments(audioSegments)

    return new NextResponse(new Uint8Array(combinedAudio), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "attachment; filename=podcast.mp3",
      },
    })
  } catch (error) {
    console.error("Error generating podcast audio:", error)
    return NextResponse.json({ error: "Failed to generate podcast audio" }, { status: 500 })
  }
}

async function combineAudioSegments(segments: AudioSegment[]): Promise<Buffer> {
  // For web-only solution, we'll concatenate the base64 audio data
  // This is a simplified approach - in production you'd use proper audio processing

  if (segments.length === 0) {
    throw new Error("No audio segments to combine")
  }

  // For now, return the first segment as a fallback
  // In a real implementation, you'd use Web Audio API or a library like lamejs
  const firstSegment = segments[0]
  return Buffer.from(firstSegment.audioContent, "base64")
}
