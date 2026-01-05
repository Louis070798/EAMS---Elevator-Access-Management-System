
import { GoogleGenAI, Type } from "@google/genai";
import { AccessLog } from "../types";

export const getAIInsights = async (logs: AccessLog[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const logSummary = logs.map(l => `${l.timestamp}: ${l.userName} (${l.method}) attempted Floor ${l.floor} on ${l.elevatorName} -> ${l.result}`).join('\n');

  const prompt = `
    As a security analyst for EAMS (Elevator Access Management System), analyze the following recent access logs and provide insights.
    Identify potential security risks, high-traffic patterns, and optimization suggestions for elevator management.
    Format your response in structured JSON with fields: 'summary', 'anomalies' (list), and 'suggestions' (list).
    
    Logs:
    ${logSummary}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            anomalies: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "anomalies", "suggestions"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Insights Error:", error);
    return {
      summary: "Unable to process logs at this moment.",
      anomalies: ["Service connection error"],
      suggestions: ["Check API Key or network status."]
    };
  }
};
