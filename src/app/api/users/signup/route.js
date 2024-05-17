import User from "@/components/lib/UserModel/userModel";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import sendEmail from "@/utils/mailer";



export const POST = async(req)=>
{
    try{
        await ConnectDatabase()
        const reqBody = await req.json();
        const {username, email, password} = reqBody;
        console.log('Request Body: ',reqBody);
    
        // Validation
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User does esists!"}, 401)
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log('Saved User: ', savedUser);
    
        // Send verification email
        await sendEmail({email, emailType:'VERIFY', userId:savedUser._id})
        return NextResponse.json({
            message: 'User Registration Successfull',
            success: true,
            savedUser
        })
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error: error.message})
    }


}