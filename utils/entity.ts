// ENTITY
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY_4 || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function extractEntities(text: string, entityType: string): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      Extract ${entityType === 'all' ? 'all entities' : entityType + ' entities'} from the following text.
      Return only the entity names separated by commas, nothing else and also those entity that can be searched on wikipedia.
      
      Text: ${text}
    `;

    const result = await model.generateContent(prompt);
    return result.response.text().split(',').map(entity => entity.trim());
  } catch (error) {
    console.error("Entity extraction error:", error);
    throw error;
  }
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
