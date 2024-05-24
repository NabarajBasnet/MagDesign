// User Signup route

import User from "@/components/lib/UserModel/userModel";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import sendEmail from "@/utils/mailer";

export const POST = async(req)=>
{
    try {
        // Connect database
        await ConnectDatabase();
    
        const reqBody = await req.json();
        const {username, email, password} = reqBody;

        // Validate user in database
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: 'User exists!'},{status: 400})
        }

        // Secure password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        
        
        // Send verification email to client
        await sendEmail({email: email, emailType: 'VERIFY', userId: savedUser._id});

        return NextResponse.json({
            message: 'User registration successfull',
            success: true,
            savedUser,
        })

    } catch (error) {
        console.log('Error: ', error.message);
        return NextResponse.json({error: error.message},{status: 500})
    }
}