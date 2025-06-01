/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
//NORMAL TEMPLATE
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY_1 || '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function enhancePromptWithGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  const enhancePrompt = `Enhance and expand upon the following prompt to make it more detailed and specific: "${prompt}" and add a phrase "don't give in html format"` ;
  
  const result = await model.generateContent(enhancePrompt);
  const response = await result.response;
  return response.text();
}

async function generateOutputWithGemini(enhancedPrompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using Gemini Pro as Gemini 2.0 is not available yet
  const generatePrompt = `Generate a detailed and specific response based on the following prompt: "${enhancedPrompt}"`;
  const result = await model.generateContent(generatePrompt);
  const response = await result.response;
  return response.text();
}

export async function generateCombinedText(prompt: string): Promise<string> {
  try {
    const enhancedPrompt = await enhancePromptWithGemini(prompt);
    const finalOutput = await generateOutputWithGemini(enhancedPrompt);
    console.log("Final Output:", finalOutput);
    return finalOutput;
  } catch (error) {
    console.error("Error in combined text generation:", error);
    throw error;
  }
}
