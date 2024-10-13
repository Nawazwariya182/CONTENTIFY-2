// import { GoogleGenerativeAI } from "@google/generative-ai";

// const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY || '';
// const AIXPLAIN_MODEL_ID = '60ddefad8d38c51c5885ef75';
// const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// interface EntityLinkingResponse {
//   data: string;
//   completed: boolean;
// }

// export async function extractEntities(text: string): Promise<string[]> {
//   try {
//     const response = await fetch(`https://models.aixplain.com/api/v1/execute/${AIXPLAIN_MODEL_ID}`, {
//       method: 'POST',
//       body: JSON.stringify({ data: text }),
//       headers: {
//         'x-api-key': AIXPLAIN_API_KEY,
//         'content-type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`AIxplain API error: ${response.statusText}`);
//     }

//     const results = await response.json();
//     const urlToPoll = results.data;

//     return new Promise((resolve, reject) => {
//       const pollInterval = setInterval(async () => {
//         try {
//           const statusResponse = await fetch(urlToPoll, {
//             method: 'GET',
//             headers: {
//               'x-api-key': AIXPLAIN_API_KEY,
//               'content-type': 'application/json'
//             }
//           });

//           if (!statusResponse.ok) {
//             throw new Error(`AIxplain status API error: ${statusResponse.statusText}`);
//           }

//           const results: EntityLinkingResponse = await statusResponse.json();
//           if (results.completed) {
//             clearInterval(pollInterval);
//             // Parse the response as a string and split it into an array of entities
//             const entities = results.data.split(',').map(entity => entity.trim());
//             resolve(entities);
//           }
//         } catch (error) {
//           clearInterval(pollInterval);
//           reject(error);
//         }
//       }, 5000);
//     });
//   } catch (error) {
//     console.error("Entity extraction error:", error);
//     throw error;
//   }
// }

// export async function getWikipediaLinks(entities: string[]): Promise<Record<string, string>> {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//   const prompt = `For each of the following entities, provide a Wikipedia link if available. Return the result as a JSON object with entities as keys and Wikipedia URLs as values. If no Wikipedia page exists, use null as the value. Entities: ${entities.join(", ")}`;
  
//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const linkData = JSON.parse(response.text());
//     return linkData;
//   } catch (error) {
//     console.error("Error getting Wikipedia links:", error);
//     throw error;
//   }
// }
// utils/entity.ts

export async function extractEntities(text: string): Promise<string[]> {
    const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_5 || '';
    const AIXPLAIN_MODEL_ID = '60ddefad8d38c51c5885ef75';
  
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
                const entities = results.data.split(',').map((entity: string) => entity.trim()); // Now 'entity' has a type of 'string'
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
  
  // Utility to generate Wikipedia links for the extracted entities
  export function getWikipediaLinks(entities: string[]): Record<string, string> {
    const wikipediaLinks: Record<string, string> = {};
  
    entities.forEach((entity) => {
      const formattedEntity = entity.replace(/\s+/g, '_'); // Replace spaces with underscores for Wikipedia URLs
      wikipediaLinks[entity] = `https://en.wikipedia.org/wiki/${formattedEntity}`;
    });
  
    return wikipediaLinks;
  }
  