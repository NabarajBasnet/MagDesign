// Verify email route

import User from "@/components/lib/UserModel/userModel";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        if(mongoose.connection.readyState <1 ){
            await ConnectDatabase();
        };
        // const reqBody = await req.json();
        // const {token} = reqBody;

        // Extract token from url

        const newUrl = new URL(req.url);
        const token = newUrl.searchParams.get('token');
        console.log('Request token: ', token);

        // Validate user

        const user = await User.findOne({
            verifyToken: token,
            // verifyTokenExpiry: {$gt: Date.now()}
        });

        if(!user){
            return NextResponse.json({error: 'Invalid Token'},{status: 400});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        user.save();

        return NextResponse.json({
            message: 'Email verification successfull',
            success: true
        });

    } catch (error) {
        console.log('Error: ', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}