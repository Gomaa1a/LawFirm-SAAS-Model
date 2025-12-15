import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not defined in process.env");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-ui-demo' });
};

export const generateLegalResponse = async (
  prompt: string,
  language: 'en' | 'ar',
  context?: string
): Promise<string> => {
  try {
    const ai = getClient();
    
    const systemInstruction = `
      You are Seekers, a legal assistant for an Omani law firm.
      Your goal is to assist internal legal teams with document analysis and drafting.
      
      Constraints:
      1. This is for Internal Team Use Only.
      2. If the user asks about specific uploaded documents, pretend you have access to a secure RAG (Retrieval Augmented Generation) pipeline.
      3. Respond in ${language === 'ar' ? 'Arabic' : 'English'}.
      4. Be professional, concise, and legally precise.
      5. Always include a subtle disclaimer that you are an AI and human review is required.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Lower temperature for more factual/consistent legal responses
      },
    });

    return response.text || "I apologize, but I could not generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the AI Legal Assistant. Please check your API key or internet connection.";
  }
};