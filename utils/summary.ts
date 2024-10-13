const API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY || '';
const MODEL_ID = '6297c0a08937c207d9914811';

export async function summarizeText(text: string): Promise<string> {
  try {
    const response = await fetch(`https://models.aixplain.com/api/v1/execute/${MODEL_ID}`, {
      method: 'POST',
      body: JSON.stringify({ data: text }),
      headers: {
        'x-api-key': API_KEY,
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    const urlToPoll = results.data;

    return new Promise((resolve, reject) => {
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(urlToPoll, {
            method: 'GET',
            headers: {
              'x-api-key': API_KEY,
              'content-type': 'application/json'
            }
          });

          if (!statusResponse.ok) {
            throw new Error(`HTTP error! status: ${statusResponse.status}`);
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
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw error;
  }
}