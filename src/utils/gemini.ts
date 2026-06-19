import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const analyzeCarbonFootprint = async (data: any) => {
  if (!genAI) {
    throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze this user's monthly carbon footprint data and provide a detailed sustainability report.
    Data: ${JSON.stringify(data)}
    
    Return a JSON object with the following structure:
    {
      "analysis": "A brief overview of their footprint",
      "majorSources": ["Source 1", "Source 2"],
      "suggestions": ["Tip 1", "Tip 2", "Tip 3"],
      "sustainabilityScore": 0-100,
      "dailyChallenges": ["Challenge 1", "Challenge 2"],
      "weeklyGoals": ["Goal 1", "Goal 2"]
    }
    Ensure the response is ONLY the JSON object.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean potential markdown formatting
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const getGreenTips = async () => {
  if (!genAI) return ["Reduce, Reuse, Recycle", "Use public transport", "Eat less meat"];

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Provide 5 unique, short, and impactful eco-friendly tips for a sustainable lifestyle. Return as a simple JSON array of strings.";

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanedText = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch {
    return ["Switch to LED bulbs", "Compost organic waste", "Use a reusable water bottle", "Unplug idle electronics", "Plant a native tree"];
  }
};
