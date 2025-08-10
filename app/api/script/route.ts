/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY_1 || "")

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" })

    const result = await model.generateContent(prompt)
    const response = await result.response
    const script = response.text()

    return NextResponse.json({ script })
  } catch (error) {
    console.error("Error generating script:", error)
    return NextResponse.json({ error: "Failed to generate script" }, { status: 500 })
  }
}
