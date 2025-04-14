/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY_1 || ""
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

export async function enhanceDocumentFormatting(content: string, format: "pdf" | "docx"): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" })

  const formatSpecificInstructions =
    format === "pdf"
      ? "Format this content for a PDF document with HTML styling."
      : "Format this content for a DOCX document with appropriate structure."

  const enhancePrompt = `
    Enhance the following content for a professional ${format.toUpperCase()} document:
    
    ${content}
    
    ${formatSpecificInstructions}
    
    Apply the following enhancements:
    1. Add appropriate colors to headings (use blue #3B82F6 for main headings)
    2. Format code blocks with monospace font and light gray background
    3. Add subtle borders to separate sections
    4. Ensure proper spacing between paragraphs
    5. Add emphasis to important points
    6. Create a professional, clean layout
    7. If there are lists, format them properly
    8. If there are tables, ensure they have proper borders and styling
    
    For PDF: Return the content with HTML formatting that can be rendered to PDF.
    For DOCX: Return the content with markdown formatting that preserves structure.
    
    Make the document visually appealing and professional while maintaining readability.
  `

  try {
    const result = await model.generateContent(enhancePrompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error enhancing document formatting:", error)
    throw error
  }
}
