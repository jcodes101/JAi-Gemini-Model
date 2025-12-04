// Gemini.js for Gemini 2.0 (matching structure to 1.0)

// Node.js >=18
// npm install @google/genai mime dotenv

import { GoogleGenAI } from '@google/genai';

// VITE_ prefix needed for Vite apps being developed when using API's
// const MODEL_NAME = 'gemini-2.5-pro-exp-03-25';

/* 
VALID MODELS as of 12/4/2025:
  gemini-2.0-flash
  gemini-2.0-pro
  gemini-2.0-flash-lite
  gemini-2.0-flash-exp
*/
const MODEL_NAME = 'gemini-2.5-flash';
const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const contents = [
    {
      role: 'user',
      parts: [
        { text: prompt },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: MODEL_NAME,
    config,
    contents,
  });

  let fullResponse = '';

  for await (const chunk of response) {
    fullResponse += chunk.text || '';
  }

  console.log(fullResponse);
  return fullResponse;
}

export default runChat;
