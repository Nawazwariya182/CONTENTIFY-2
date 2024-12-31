//NORMAL TEMPLATE
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY_1 || '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function enhancePromptWithGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const enhancePrompt = `Enhance and expand upon the following prompt to make it more detailed and specific: "${prompt}" and add a phrase as make it as rich text editor and don't gve in html format` ;
  
  const result = await model.generateContent(enhancePrompt);
  const response = await result.response;
  return response.text();
}

async function generateOutputWithGemini(enhancedPrompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using Gemini Pro as Gemini 2.0 is not available yet
  
  const result = await model.generateContent(enhancedPrompt);
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
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// async function enhancePromptWithGemini(prompt: string): Promise<string> {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//   const enhancePrompt = `Enhance and expand upon the following prompt to make it more detailed and specific: "${prompt}"`;
  
//   const result = await model.generateContent(enhancePrompt);
//   const response = await result.response;
//   return response.text();
// }

// async function generateOutputWithGemini(enhancedPrompt: string): Promise<string> {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Using Gemini Pro as Gemini 2.0 is not available yet
  
//   const result = await model.generateContent(enhancedPrompt);
//   const response = await result.response;
//   return response.text();
// }

// export async function generateCombinedText(prompt: string): Promise<string> {
//   try {
//     const enhancedPrompt = await enhancePromptWithGemini(prompt);
//     const finalOutput = await generateOutputWithGemini(enhancedPrompt);
//     console.log("Final Output:", finalOutput);
//     return finalOutput;
//   } catch (error) {
//     console.error("Error in combined text generation:", error);
//     throw error;
//   }
// }

