import {GoogleGenerativeAI } from"@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const apiKey = process.env.GEMINI_API_KEY;


const genAI = new GoogleGenerativeAI("AIzaSyCLVag9DCtdrS1CnKjUOF4lDtkvfebE-O4");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default model;