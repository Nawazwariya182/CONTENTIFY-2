import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

export type Restaurant = {
  name: string;
  area: string;
  cuisineType: string;
};

export type DishSuggestion = {
  name: string;
  approximateCost: string;
};

export type AccompanimentSuggestion = {
  name: string;
  approximateCost: string;
};

export type FoodSuggestion = {
  dishes: DishSuggestion[];
  accompaniments: AccompanimentSuggestion[];
  combinations: string[];
  error?: string;
};

const AIXPLAIN_API_KEY = process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY || '';
const AIXPLAIN_MODEL_ID = "66ef42e56eb56335ca302621"
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
let geminiModel: GenerativeModel;

async function getAIxplainSuggestions(prompt: string): Promise<string> {
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

async function refineWithGemini(initialSuggestions: string, context: string, orderedItems: string[]): Promise<FoodSuggestion> {
  if (!geminiModel) {
    geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  }

  const prompt = `Based on the following context, initial suggestions, and already ordered items, provide:
1. 5 dish suggestions
2. 3 accompaniment suggestions
3. 3 combinations using the ordered items and suggested dishes/accompaniments

Format the output as a JSON object with 'dishes', 'accompaniments', and 'combinations' arrays. 'dishes' and 'accompaniments' should contain objects with 'name' and 'approximateCost' properties. 'combinations' should be an array of strings. Do not include any markdown formatting or code block indicators in your response.

Context: ${context}
Initial Suggestions: ${initialSuggestions}
Ordered Items: ${orderedItems.join(', ')}

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

export async function getFoodSuggestions(restaurant: Restaurant, hasPurchased: boolean, numberOfPeople: number, orderedItems: string[]): Promise<FoodSuggestion> {
  try {
    const context = `Restaurant: ${restaurant.name}, Area: ${restaurant.area}, Cuisine: ${restaurant.cuisineType}, ${hasPurchased ? 'Has already purchased food' : 'Has not ordered yet'}, Number of people: ${numberOfPeople}`;
    const promptForAIxplain = `I'm at ${restaurant.name} in ${restaurant.area}, which serves ${restaurant.cuisineType} cuisine. ${
      hasPurchased
        ? `I've already purchased ${orderedItems.join(', ')} for ${numberOfPeople} people. Can you suggest 5 other dishes to try next time, 3 accompaniments that would go well with the meal, and 3 combinations using the ordered items and your suggestions?`
        : `I haven't ordered yet. What are 5 dishes you recommend I eat and 3 accompaniments for a group of ${numberOfPeople} people? Also, suggest 3 combinations of these dishes and accompaniments.`
    } Please provide the name of each dish and accompaniment along with its approximate cost.`;

    const aixplainSuggestions = await getAIxplainSuggestions(promptForAIxplain);
    const refinedSuggestions = await refineWithGemini(aixplainSuggestions, context, orderedItems);

    return refinedSuggestions;
  } catch (error) {
    console.error("Error in getFoodSuggestions:", error);
    return {
      dishes: [],
      accompaniments: [],
      combinations: [],
      error: "An error occurred while generating food suggestions. Please try again later."
    };
  }
}

export function validateRestaurantInput(restaurant: Partial<Restaurant>, numberOfPeople: number): string | null {
  if (!restaurant.name || restaurant.name.trim() === "") {
    return "Restaurant name is required";
  }
  if (!restaurant.area || restaurant.area.trim() === "") {
    return "Restaurant area is required";
  }
  if (!restaurant.cuisineType || restaurant.cuisineType.trim() === "") {
    return "Cuisine type is required";
  }
  if (numberOfPeople < 1) {
    return "Number of people must be at least 1";
  }
  return null;
}