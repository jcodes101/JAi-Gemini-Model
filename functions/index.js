import * as functions from 'firebase-functions';
import axios from 'axios';

// Replace with your Gemini API endpoint and API Key
const GEMINI_API_URL = 'https://api.gemini.com/v1/your-endpoint'; // Adjust the endpoint as necessary
const GEMINI_API_KEY = functions.config().gemini.key;  // Make sure to set this in Firebase config

// Define the Cloud Function to call Gemini API
export const askGemini = functions.https.onRequest(async (req, res) => {
  try {
    const prompt = req.body.prompt;  // Get the prompt from the request body

    // Make a request to Gemini API
    const response = await axios.post(
      GEMINI_API_URL,
      {
        prompt: prompt,  // Pass the prompt to Gemini API
      },
      {
        headers: {
          'Authorization': `Bearer ${GEMINI_API_KEY}`,  // Bearer token for authentication
          'Content-Type': 'application/json',
        },
      }
    );

    // Send the response back to the client
    res.status(200).send(response.data); 
  } catch (error) {
    console.error('Gemini API Error:', error);  // Log the error for debugging
    res.status(500).send({ error: error.message });  // Send error to client
  }
});
