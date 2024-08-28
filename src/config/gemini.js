import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = 'AIzaSyB506GBGjzIJIcPMEQMePl5IKqdNyk36Ic';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            // safetySettings: Adjust safety settings
            // See https://ai.google.dev/gemini-api/docs/safety-settings
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        const response = result.response.text();
        console.log(response);
        if(!response.length)
          response = `I apologize, but I couldn't process your request.<br />
          There might be a few reasons for this:<br />
          - Safety concerns: The content of your request might violate our safety guidelines.<br />
          - Technical difficulties: The system may be experiencing temporary issues.<br />
          - Complexity: The request might be too complex or ambiguous to understand.`
        return response;
    } 
    catch (error) 
    {
      const errorResponse = `I apologize, but I couldn't process your request.
There might be a few reasons for this:
- Safety concerns: The content of your request might violate our safety guidelines.
- Technical difficulties: The system may be experiencing temporary issues.
- Complexity: The request might be too complex or ambiguous to understand.`;
        return errorResponse;
    }
  }

  export default run;