// CUSTOM TEMPLATE
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY_3 || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function enhancePromptWithGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const refinementPrompt = `
    Enhance and refine the following content creation prompt to make it more specific, detailed, and comprehensive. 
    Add relevant context, specifications, and structure suggestions while maintaining the original intent:

    Original Prompt: ${prompt}

    Return only the enhanced prompt, without any explanations or additional text.
  `;
  const result = await model.generateContent(refinementPrompt);
  console.log("Enhanced prompt:", result.response.text());
  return result.response.text();
}

async function generateContentWithGemini(enhancedPrompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const contentPrompt = `
    Create comprehensive content based on this prompt: "${enhancedPrompt}"
    
    Requirements:
    - Use proper markdown formatting with headings, lists, and emphasis
    - Maintain a professional and engaging tone
    - Include relevant sections and subheadings
    - Ensure content is well-structured and flows logically
    - Add examples or elaborations where appropriate
  `;
  
  const result = await model.generateContent(contentPrompt);
  return result.response.text();
}

export async function generateEnhancedContent(prompt: string): Promise<{ refinedPrompt: string, content: string }> {
  try {
    const refinedPrompt = await enhancePromptWithGemini(prompt);
    const finalContent = await generateContentWithGemini(refinedPrompt);
    return { refinedPrompt, content: finalContent };
  } catch (error) {
    console.error("Error in enhanced content generation:", error);
    throw error;
  }
}

