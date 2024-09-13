import dbConnect from "@/lib/dbconnect";
import conversation from "@/model/conversation";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function GET(req, res){

  await dbConnect()

  const session = await getServerSession(authOptions);
  const _user = session?.user;

  if (!session || !_user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  try {
    const conversations = await conversation.find({userId: _user._id});

    return NextResponse.json(
      {
        success: true,
        message: 'Conversations fetched',
        conversations,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }      
}