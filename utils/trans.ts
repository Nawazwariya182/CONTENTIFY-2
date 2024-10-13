const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_3 || '';
const AIXPLAIN_TRANSLATE_MODEL_ID = '66aa869f6eb56342c26057e1';
const AIXPLAIN_DETECT_MODEL_ID = '66aa869f6eb56342c26057e2'; // Replace with the actual model ID for language detection

interface TranslationResponse {
  data: string;
  completed: boolean;
}

interface DetectionResponse {
  data: string;
  completed: boolean;
}

export async function translateText(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
  try {
    const response = await fetch(`https://models.aixplain.com/api/v1/execute/${AIXPLAIN_TRANSLATE_MODEL_ID}`, {
      method: 'POST',
      body: JSON.stringify({
        text: text,
        sourcelanguage: sourceLanguage,
        targetlanguage: targetLanguage,
      }),
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

          const results: TranslationResponse = await statusResponse.json();
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
    console.error("Translation error:", error);
    throw error;
  }
}

export async function detectLanguage(text: string): Promise<string> {
  try {
    const response = await fetch(`https://models.aixplain.com/api/v1/execute/${AIXPLAIN_DETECT_MODEL_ID}`, {
      method: 'POST',
      body: JSON.stringify({
        text: text,
      }),
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

          const results: DetectionResponse = await statusResponse.json();
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
    console.error("Language detection error:", error);
    throw error;
  }
}