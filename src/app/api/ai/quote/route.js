import model from "@/lib/gemini";
import { NextResponse } from "next/server";


export async function GET(req, res) {

  try {
    const prompt = `Generate a new motivational quote of an famous person, either ${Math.random()} or 2 lines long. Do not include double quotes. Separate the quote from the author's name with an underscore.`;
    const {response} = await model.generateContent(prompt);
    console.log(response);
    console.log(response.text());
    const text =  response.text();

    return NextResponse.json({ quote: text.split('_')[0], author: text.split('_')[1] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

