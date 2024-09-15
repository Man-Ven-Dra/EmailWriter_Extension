import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiLogic = (prompts) => {
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = prompts;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return text;
    }
    return run();

}

export default geminiLogic;