import {GoogleGenerativeAI } from"@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default model;