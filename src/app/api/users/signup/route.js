import connectionStr from "@/components/lib/DB"
import User from "@/components/lib/UserModel/userModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import sendEmail from "@/utils/mailer";



export const POST = async (req) =>
{
    try {
        const reqBody = await req.json();
        const {username, email, password} = reqBody;
        
        // Validation
        console.log('Req Body: ', reqBody)

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: 'User Exists!', status: 400})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username, 
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        // Send verification email
        await sendEmail({email, emailType: 'VERIFY', userId:savedUser._id})
        return NextResponse.json({
            message: 'User registered successfully',
            success: true,
            savedUser
        })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {success: false, status: 500})
    }
    await mongoose.connect(connectionStr);
    return NextResponse.json({ success: true })
}

