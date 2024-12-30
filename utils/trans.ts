import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function detectLanguage(text: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    Detect the language of the following text and return ONLY the ISO 639-1 language code (e.g., 'en' for English, 'es' for Spanish).
    No other text or explanation, just the code.

    Text: "${text}"
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Language detection error:", error);
    throw error;
  }
}

export async function translateText(
  text: string, 
  sourceLanguage: string, 
  targetLanguage: string, 
  tone: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const prompt = `
    Translate the following text from ${sourceLanguage} to ${targetLanguage}.
    Use a ${tone} tone in the translation.
    Return only the translated text, no explanations or additional content.

    Text to translate: "${text}"
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}
