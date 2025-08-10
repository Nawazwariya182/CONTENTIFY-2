/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
*/

import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY_1 || ""
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

async function enhanceVideoPromptWithGemini(prompt: string, style: string, duration: number): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" })

  const enhancePrompt = `
    Enhance and expand the following video prompt to make it more detailed and cinematic for AI video generation:
    
    Original prompt: "${prompt}"
    Style: ${style}
    Duration: ${duration} seconds
    
    Please enhance this prompt by:
    1. Adding specific visual details and camera movements
    2. Including lighting and atmosphere descriptions
    3. Specifying the ${style} style characteristics
    4. Making it suitable for ${duration}-second video generation
    5. Adding motion and action descriptions
    6. Don't include HTML formatting
    
    Return only the enhanced prompt without explanations.
  `

  const result = await model.generateContent(enhancePrompt)
  const response = await result.response
  return response.text().trim()
}

export async function generateEnhancedVideoPrompt(prompt: string, style = "", duration = 5): Promise<string> {
  try {
    if (!GEMINI_API_KEY) {
      console.warn("Gemini API key not found, using original prompt")
      return `${style ? `${style} style: ` : ""}${prompt}`
    }

    const enhancedPrompt = await enhanceVideoPromptWithGemini(prompt, style, duration)
    console.log("Enhanced Video Prompt:", enhancedPrompt)
    return enhancedPrompt
  } catch (error) {
    console.error("Error enhancing video prompt:", error)
    // Fallback to basic enhancement
    return `${style ? `${style} style: ` : ""}${prompt}, cinematic lighting, smooth camera movement, high quality video`
  }
}
