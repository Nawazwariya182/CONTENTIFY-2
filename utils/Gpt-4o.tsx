import { GoogleGenerativeAI } from "@google/generative-ai";

const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_1 || '';
const AIXPLAIN_MODEL_ID = '64d21cbb6eb563074a698ef1';
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function getAIxplainOutput(prompt: string): Promise<string> {
  const response = await fetch(`https://models.aixplain.com/api/v1/execute/${AIXPLAIN_MODEL_ID}`, {
    method: 'POST',
    body: JSON.stringify({ text: prompt }),
    headers: {
      'x-api-key': AIXPLAIN_API_KEY,
      'content-type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`AIxplain API error: ${response.statusText}`);
  }

  const results = await response.json();
  const urlToPoll = results.data;

  return new Promise((resolve, reject) => {
    const pollInterval = setInterval(async () => {
      try {
        const statusResponse = await fetch(urlToPoll, {
          method: 'GET',
          headers: {
            'x-api-key': AIXPLAIN_API_KEY,
            'content-type': 'application/json'
          }
        });

        if (!statusResponse.ok) {
          throw new Error(`AIxplain status API error: ${statusResponse.statusText}`);
        }

        const results = await statusResponse.json();
        if (results.completed) {
          clearInterval(pollInterval);
          resolve(results.data);
        }
      } catch (error) {
        clearInterval(pollInterval);
        reject(error);
      }
    }, 5000);
  });
}

async function extendWithGemini(initialText: string, originalPrompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt = `Complete and enhance the following text based on this prompt: "${originalPrompt}". Maintain the same tone and style, and do not mention any refinement process:\n\n${initialText}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function generateCombinedText(prompt: string): Promise<string> {
  try {
    const aixplainOutput = await getAIxplainOutput(prompt);
    const finalOutput = await extendWithGemini(aixplainOutput, prompt);
    return finalOutput;
  } catch (error) {
    console.error("Error in combined text generation:", error);
    throw error;
  }
}