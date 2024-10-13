import type { NextApiRequest, NextApiResponse } from 'next';

const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY || '';
const AIXPLAIN_MODEL_ID = '66140a046eb563380f6cd031';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { audioData, inputText, gender } = req.body;

  // Log the incoming request body
  console.log('Incoming request body:', req.body);

  if (!audioData || !inputText || !gender) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    console.log('Using API key:', AIXPLAIN_API_KEY); // Log API key for debugging

    const response = await fetch(`https://models.aixplain.com/api/v1/execute/${AIXPLAIN_MODEL_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AIXPLAIN_API_KEY,
      },
      body: JSON.stringify({
        data: audioData,
        inputtext: inputText,
        gender: gender,
      }),
    });

    if (!response.ok) {
      throw new Error(`AIxplain API request failed with status ${response.status}`);
    }

    const result = await response.json();
    const pollUrl = result.data;

    return res.status(200).json({ pollUrl });
  } catch (error) {
    console.error('Error in voice cloning:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
