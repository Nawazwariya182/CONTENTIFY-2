import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);

export async function generateAlternativePrompts(prompt: string, style: string, imageCount: number): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(`
    Given the following prompt and style, create ${imageCount} enhanced version(s) of the prompt for image generation:
    
    Original Prompt: ${prompt}
    Style: ${style}
    
    Please provide ${imageCount} unique, enhanced prompt(s) that maintain the core idea and specified style, but offer slightly different perspectives or details. Each prompt should be concise and suitable for image generation.
    
    Format the output as a numbered list:
    1. [First enhanced prompt]
    2. [Second enhanced prompt]
    3. [Third enhanced prompt]
  `);

  const enhancedPrompts = result.response.text()
    .split('\n')
    .filter(line => line.trim().match(/^\d+\./))
    .map(line => line.replace(/^\d+\.\s*/, '').trim());

  console.log("Enhanced Prompts:", enhancedPrompts);
  return enhancedPrompts;
}
