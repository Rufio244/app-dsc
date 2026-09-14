import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

export async function summarizeAndFormatText(rawText, docType) {
  try {
    const prompt = `You are an expert document summarizer and creator. 
    Analyze the following raw text, extract key insights, create an executive summary, 
    and format it professionally as a ${docType} document with clear markdown headings and bullet points:
    
    ${rawText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    throw new Error(`AI Processing Error: ${error.message}`);
  }
}
