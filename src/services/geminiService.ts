import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getRiskAssessment(environmentalData: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following environmental data for a rural community and provide a risk assessment for Malaria and Cholera. 
      Data: ${JSON.stringify(environmentalData)}
      
      Return a JSON object with:
      - malariaRisk: "Low" | "Medium" | "High"
      - choleraRisk: "Low" | "Medium" | "High"
      - reasoning: A brief explanation for the risk levels.
      - actions: 3-5 immediate preventative actions.`,
      config: {
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error fetching risk assessment:", error);
    return null;
  }
}
