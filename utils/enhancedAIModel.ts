import { GoogleGenerativeAI } from "@google/generative-ai";

const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY || '';
const AIXPLAIN_MODEL_ID = '6646261c6eb563165658bbb1'; 
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function refinePromptWithGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const refinementPrompt = `Refine and enhance the following content creation prompt to make it more specific and detailed:\n\n${prompt}\n\nProvide a refined version of the prompt that will lead to more comprehensive and high-quality content generation.`;
  
  const result = await model.generateContent(refinementPrompt);
  const response = await result.response;
  return response.text();
}

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

async function enhanceWithGemini(initialText: string, refinedPrompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const enhancementPrompt = `
    Complete and enhance the following text based on this refined prompt: "${refinedPrompt}". 
    Maintain the same tone and style, and format the output for a rich text editor. 
    Include appropriate headings, lists, and emphasis where needed."
  `;
  
  const result = await model.generateContent(enhancementPrompt + "\n\n" + initialText);
  const response = await result.response;
  return response.text();
}

export async function generateEnhancedContent(prompt: string): Promise<{ refinedPrompt: string, content: string }> {
  try {
    const refinedPrompt = await refinePromptWithGemini(prompt);
    const aixplainOutput = await getAIxplainOutput(refinedPrompt);
    const finalOutput = await enhanceWithGemini(aixplainOutput, refinedPrompt);
    return { refinedPrompt, content: finalOutput };
  } catch (error) {
    console.error("Error in enhanced content generation:", error);
    throw error;
  }
}