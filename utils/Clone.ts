const API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY || '';
const MODEL_ID = '66140a046eb563380f6cd031';

export async function cloneVoice(audioData: string, inputText: string, gender: string): Promise<string | null> {
  try {
    // Ensure audioData is a valid base64 string without the data URL prefix
    const base64Audio = audioData.startsWith('data:') ? audioData.split(',')[1] : audioData;

    // Create a JSON object for the gender label
    const genderLabel = JSON.stringify({ gender: gender });

    const payload = {
      data: base64Audio,
      inputtext: inputText,
      gender: genderLabel,
    };

    console.log('Sending payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(`https://models.aixplain.com/api/v1/execute/${MODEL_ID}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'x-api-key': API_KEY,
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Response (${response.status}):`, errorBody);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }

    const results = await response.json();
    console.log('API Response:', JSON.stringify(results, null, 2));

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
          console.log('Poll Response:', JSON.stringify(results, null, 2));

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
    console.error("Error cloning voice:", error);
    throw error;
  }
}