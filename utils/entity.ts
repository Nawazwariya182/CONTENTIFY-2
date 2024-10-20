import { GoogleGenerativeAI } from "@google/generative-ai";

const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_5 || '';
const AIXPLAIN_MODEL_ID = '60ddefad8d38c51c5885ef75';
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function extractEntities(text: string): Promise<string[]> {
  try {
    const response = await fetch(`https://models.aixplain.com/api/v1/execute/${AIXPLAIN_MODEL_ID}`, {
      method: 'POST',
      body: JSON.stringify({ data: text }),
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
            const entities = results.data.split(',').map((entity: string) => entity.trim());
            resolve(entities);
          }
        } catch (error) {
          clearInterval(pollInterval);
          reject(error);
        }
      }, 5000);
    });
  } catch (error) {
    console.error("Entity extraction error:", error);
    throw error;
  }
}

export async function sortEntities(entities: string[], entityType: string): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const prompt = `
    Sort and filter the following entities based on the entity type "${entityType}".
    If the entity type is "all", return all entities sorted alphabetically.
    Entities: ${entities.join(', ')}
    
    Return only the sorted list of entities, separated by commas.
  `;

  const result = await model.generateContent(prompt);
  const sortedEntities = result.response.text().split(',').map(entity => entity.trim());
  
  return sortedEntities;
}

export async function getWikipediaLinks(entities: string[]): Promise<Record<string, string>> {
  const wikipediaLinks: Record<string, string> = {};

  for (const entity of entities) {
    try {
      const formattedEntity = entity.replace(/\s+/g, '_');
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedEntity}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.extract) {
          wikipediaLinks[entity] = data.content_urls.desktop.page;
        }
      }
    } catch (error) {
      console.error(`Error fetching Wikipedia link for ${entity}:`, error);
    }
  }

  return wikipediaLinks;
}