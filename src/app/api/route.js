import model from "@/lib/gemini";

async function run() {
  const prompt = "give me a random pick up line new every time"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
 console.log(text)

  return text
}

export async function GET(request) {

  
 const aiResponse = await run();
 console.log(aiResponse)
  
    return new Response(JSON.stringify({ quote: aiResponse }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }