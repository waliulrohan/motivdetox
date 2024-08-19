import dbConnect from '@/lib/dbconnect';
import UserModel  from '@/model/User';
import { usernameValidation } from '@/schemas/userSchema';
import { NextResponse } from 'next/server';
import {z} from "zod"



const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request) {

    await dbConnect()
    try {
        const {searchParams} = new URL(request.url);
        const queryParam ={
            username: searchParams.get('username'),
        }

        // vadidations with zod
        const result = UsernameQuerySchema.safeParse(queryParam);

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            return NextResponse.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : 'Invalid query parameters' 
            },
            {
                status: 400
            })
        }

        const {username} = result.data;

        const existingUser = await UserModel.findOne({ username })

        if(existingUser){
            return NextResponse.json({
                success: false,
                message: "username is alredy taken",
            },
            {
                status: 400
            })
        }

        return NextResponse.json({
            success: true,
            message: "usesrnamme is  unique",
        },
        {
            status: 200
        })


    } catch (error) {
        console.log('Error checking username', error);
        return NextResponse.json({
            success: false,
            message:"Error checking username"
        },
        {
            status: 500
        })
    }
}