import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req){

  await dbConnect()

  try {
   const {username, code} = await req.json();

   const user = await UserModel.findOne({username});
   if(!user){
    return NextResponse.json(
      {
        success: false,
        message: 'User not found.',
      },
      { status: 404 }
    );
   }

   const isCodeMatched = user.verifyCode == code;
   const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date(Date.now());
   if(isCodeMatched && isCodeNotExpired){
    user.isVerified = true;
    await user.save();

     return NextResponse.json(
       {
         success: true,
         message: 'Account verified successfully.',
       },
       { status: 200 }
     );
   }else if(!isCodeNotExpired){
    return NextResponse.json(
      {
        success: false,
        message: 'Verification code expired. Please, signup again to get a new code',
      },
      { status: 401 }
    );
   }else{
    return NextResponse.json(
      {
        success: false,
        message: "Verification code didn't matched",
      },
      { status: 400 }
    );
   }



  } catch (error) {
    console.error('Error verifing user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error verifing user',
      },
      { status: 500 }
    );
  }      
}