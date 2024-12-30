import { GoogleGenerativeAI } from "@google/generative-ai";

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

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getFoodSuggestions(
  restaurant: Restaurant, 
  hasPurchased: boolean, 
  numberOfPeople: number, 
  orderedItems: string[]
): Promise<FoodSuggestion> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Act as a food expert and provide suggestions for the following scenario:
      Restaurant: ${restaurant.name}
      Area: ${restaurant.area}
      Cuisine Type: ${restaurant.cuisineType}
      Number of People: ${numberOfPeople}
      ${hasPurchased ? `Already Ordered Items: ${orderedItems.join(', ')}` : 'No items ordered yet'}

      Please provide:
      1. 5 dish suggestions with approximate costs
      2. 3 accompaniment suggestions with approximate costs
      3. 3 combinations using ${hasPurchased ? 'the ordered items and' : ''} your suggested dishes/accompaniments

      Return the response in this exact JSON format, without any additional text, formatting, or markdown:
      {
        "dishes": [{"name": "dish name", "approximateCost": "cost"}],
        "accompaniments": [{"name": "accompaniment name", "approximateCost": "cost"}],
        "combinations": ["combination description"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanedResponse = response.text().trim();
    
    // Remove any markdown formatting
    const jsonString = cleanedResponse.replace(/^```json\n|\n```$/g, '').trim();
    
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Received response:", cleanedResponse);
      throw new Error("Failed to parse AI response");
    }
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
