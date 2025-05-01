const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);
  const prompt = body.prompt;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // gemini-2.5-pro-exp-03-25
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: text }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
