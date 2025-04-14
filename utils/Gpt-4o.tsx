/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
// VOICE
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY_6 || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function enhancePrompt(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  const enhancementPrompt = `
    Enhance and structure the following voice input into a clear, well-formatted content prompt.
    Maintain key points while improving clarity and organization.
    Consider context and implied meaning from spoken language.
    Return only the enhanced prompt without any explanations.

    Voice Input: "${prompt}"
  `;

  const result = await model.generateContent(enhancementPrompt);
  console.log(result.response.text().trim());
  return result.response.text().trim();
}

export async function generateContent(
  prompt: string, 
  tone: string, 
  outputLength: string, 
  editPrompt?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  
  const contentPrompt = `
    Generate well-structured, formatted content based on this prompt:
    "${prompt}"
    
    Requirements:
    - Use a ${tone} tone throughout
    - Create a ${outputLength} length output
    - Include proper headings (using #, ##, ###)
    - Use bullet points and numbered lists where appropriate
    - Add emphasis using bold and italic text
    - Break into logical paragraphs
    - Include relevant quotes or callouts if applicable
    ${editPrompt ? `- Apply these edits while maintaining structure: ${editPrompt}` : ''}
    
    Format the output in markdown with proper spacing and hierarchy.
  `;

  const result = await model.generateContent(contentPrompt);
  console.log(result.response.text().trim());
  return result.response.text().trim();
}
