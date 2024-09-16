import { NextResponse } from "next/server";
import Message from "@/model/message";
import dbConnect from "@/lib/dbconnect";

export async function GET(request, { params }) {
  
  const { conversationId } = params;


  try {
    await dbConnect();

    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { conversationId } = params;
  const { role, parts } = await request.json();

  try {
    await dbConnect();

    const newMessage = new Message({
      conversationId,
      role,
      parts,
    });

    await newMessage.save();

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
