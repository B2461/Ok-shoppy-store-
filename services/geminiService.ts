
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are a friendly and helpful customer support agent for "ok shoppy store". 
This is an e-commerce platform where users can buy and sell E-books, Mobile Accessories, Pooja items (पूजन सामान), and Courses.
Keep your answers concise and helpful.
Key information:
- Helpline: 9305968628
- UPI ID: bp9305968-4@okicici
- Payments: We accept UPI, cards, and COD (Cash on Delivery).
- Tracking: Users can track orders using an AWB (Air Waybill) number in the "Track Order" section.
- Selling: Users can list their own products by clicking "List Your Product" or "Create Listing".
If you don't know the answer, politely say you don't have that information and suggest contacting the helpline.`;

export const getChatbotReply = async (userMessage: string, history: ChatMessage[]): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      // The Gemini API expects a different format, so we can't directly pass `history`.
      // We will just send the latest user message for this simple implementation.
      // For a more advanced chatbot, you would format the history correctly.
    });

    const response = await chat.sendMessage({ message: userMessage });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm sorry, but I'm having trouble connecting to my brain right now. Please try again in a moment.";
  }
};
