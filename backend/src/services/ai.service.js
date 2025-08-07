const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();

const ai = new GoogleGenAI({});


async function aiResponse(chatHistory) {



  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",  // or "gemini-2.5-flash" if you're using the fast version
    // contents: [
    //   {
    //     role: "user",
    //     parts: [
    //       { text: `${behavior}\n\nUser: ${prompt}` },
    //     ],
    //   },
    // ],
    contents:chatHistory,
  });

  return response.text;
}

module.exports = aiResponse;