import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

export type PatientData = {
  age: number;
  gender: string;
  symptoms: string[];
  duration: string;
  medicalHistory: string[];
  lifestyle: string[];
};

export type DiseasePrediction = {
  possibleDiseases: Array<{
    name: string;
    probability: string;
    description: string;
  }>;
  recommendedTests: string[];
  generalAdvice: string;
  error?: string;
};

const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY || '';
const AIXPLAIN_MODEL_ID = "640b517694bf816d35a59125"
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
let geminiModel: GenerativeModel;

async function getAIxplainPrediction(prompt: string): Promise<string> {
  const response = await fetch(`https://models.aixplain.com/api/v1/execute/${AIXPLAIN_MODEL_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AIXPLAIN_API_KEY,
    },
    body: JSON.stringify({ text: prompt }),
  });

  if (!response.ok) {
    throw new Error(`AIxplain API error: ${response.statusText}`);
  }

  const { data: pollUrl } = await response.json();
  
  const poll = async (url: string, maxAttempts = 10, interval = 5000): Promise<string> => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const pollResponse = await fetch(url, {
        method: 'GET',
        headers: { 'x-api-key': AIXPLAIN_API_KEY },
      });

      if (!pollResponse.ok) {
        throw new Error(`AIxplain polling error: ${pollResponse.statusText}`);
      }

      const pollResult = await pollResponse.json();
      if (pollResult.completed) {
        return pollResult.data;
      }

      await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error('AIxplain polling timeout');
  };

  return poll(pollUrl);
}

async function refineWithGemini(initialPrediction: string, patientData: PatientData): Promise<DiseasePrediction> {
  if (!geminiModel) {
    geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  }

  const prompt = `Based on the following patient data and initial prediction, provide:
1. 3 possible diseases with their probabilities and brief descriptions
2. 3 recommended medical tests
3. General advice for the patient

Format the output as a JSON object with 'possibleDiseases', 'recommendedTests', and 'generalAdvice' properties. 'possibleDiseases' should be an array of objects with 'name', 'probability', and 'description' properties. 'recommendedTests' should be an array of strings. 'generalAdvice' should be a string. Do not include any markdown formatting or code block indicators in your response.

Patient Data:
${JSON.stringify(patientData, null, 2)}

Initial Prediction:
${initialPrediction}

JSON Output:`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  const cleanedResponse = response.text().replace(/```json\n|\n```/g, '').trim();
  
  try {
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.log("Raw response:", cleanedResponse);
    throw new Error("Failed to parse AI response");
  }
}

export async function getDiseasePrediction(patientData: PatientData): Promise<DiseasePrediction> {
  try {
    const promptForAIxplain = `Predict possible diseases based on the following patient data:
Age: ${patientData.age}
Gender: ${patientData.gender}
Symptoms: ${patientData.symptoms.join(', ')}
Duration of symptoms: ${patientData.duration}
Medical history: ${patientData.medicalHistory.join(', ')}
Lifestyle factors: ${patientData.lifestyle.join(', ')}

Please provide possible diseases, their probabilities, and brief descriptions. Also suggest some medical tests and general advice for the patient.`;

    const aixplainPrediction = await getAIxplainPrediction(promptForAIxplain);
    const refinedPrediction = await refineWithGemini(aixplainPrediction, patientData);

    return refinedPrediction;
  } catch (error) {
    console.error("Error in getDiseasePrediction:", error);
    return {
      possibleDiseases: [],
      recommendedTests: [],
      generalAdvice: "",
      error: "An error occurred while generating disease predictions. Please try again later."
    };
  }
}

export function validatePatientData(patientData: Partial<PatientData>): string | null {
  if (!patientData.age || patientData.age < 0 || patientData.age > 120) {
    return "Please enter a valid age between 0 and 120";
  }
  if (!patientData.gender || patientData.gender.trim() === "") {
    return "Gender is required";
  }
  if (!patientData.symptoms || patientData.symptoms.length === 0) {
    return "At least one symptom is required";
  }
  if (!patientData.duration || patientData.duration.trim() === "") {
    return "Duration of symptoms is required";
  }
  return null;
}