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

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
let geminiModel: GenerativeModel;

export async function getDiseasePrediction(patientData: PatientData): Promise<DiseasePrediction> {
  try {
    if (!geminiModel) {
      geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    }

    const prompt = `Based on the following patient data, provide:
1. 3 possible diseases with their probabilities and brief descriptions
2. 3 recommended medical tests
3. General advice for the patient

Format the output as a JSON object with 'possibleDiseases', 'recommendedTests', and 'generalAdvice' properties. 'possibleDiseases' should be an array of objects with 'name', 'probability', and 'description' properties. 'recommendedTests' should be an array of strings. 'generalAdvice' should be a string. Do not include any markdown formatting or code block indicators in your response.

Patient Data:
${JSON.stringify(patientData, null, 2)}

JSON Output:`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const cleanedResponse = response.text().replace(/```json\n|\n```/g, '').trim();
    
    return JSON.parse(cleanedResponse);
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
