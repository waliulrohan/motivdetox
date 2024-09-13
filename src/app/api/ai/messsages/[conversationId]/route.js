import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Message from "@/model/message";

export async function GET(req) {
  await dbConnect();

  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

    return NextResponse.json(
      {
        success: true,
        message: 'Messages fetched successfully',
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching messages',
      },
      { status: 500 }
    );
  }
}