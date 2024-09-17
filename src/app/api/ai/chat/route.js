import dbConnect from "@/lib/dbconnect";
import conversation from "@/model/conversation";
import message from "@/model/message";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req, res){

  const { text, isNewConversation, conversationIdFromBody, role, createdAt } = await req.json();
  
  // Add validation for text
  if (!text || text.trim() === '') {
    console.log('hayraaaaaaaaaaaaaaa');
    return NextResponse.json(
      { success: false, message: 'Text is required' },
      { status: 500 }
    );
  }

  await dbConnect()

  const session = await getServerSession(authOptions);
  const _user = session?.user;
  const userId = _user._id;

  if (!session || !_user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    if(isNewConversation){
      const newConversation = new conversation({
        userId,
        title: text.substring(0, 40),
      });
      
      await newConversation.save();

      const conversationId = newConversation._id;
      const newMessage = new message({
        conversationId,
        role: "user",
        parts: [{ text }],
        createdAt,
      });

      await newMessage.save();

      return NextResponse.json(
        {
          success: true,
          message: 'Conversation created',
          conversationId,
        },
        { status: 200 }
      );
    }else{
      const existingConversation = await conversation.findOne({ _id: conversationIdFromBody });
      if (!existingConversation) {
        return NextResponse.json(
          {
            success: false,
            message: 'Conversation not found',
          },
          { status: 404 }
        );
      }
      const newMessage = new message({
        conversationId: existingConversation._id,
        role,
        parts: [{ text }],
        createdAt,
      });

      await newMessage.save();

      return NextResponse.json(
        {
          success: true,
          message: 'Message sent',
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error saving message',
        error: error.message, // Include the error message for debugging
      },
      { status: 500 }
    );
  }      
}