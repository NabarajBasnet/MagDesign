import User from "@/components/lib/UserModel/userModel";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import sendEmail from "@/utils/mailer";

export const POST = async (req) => {
    if (mongoose.connection.readyState >= 1) {
        console.log('Using existing database connection.')
    }

    try {
        await ConnectDatabase();

        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        // Validate user
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: 'User exists!' })
        }

        // Secured password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Emai verification token
        const emailVerificationToken = await bcryptjs.hash(email + Date.now(), 10);
        const emailVerificationTokenExpiry = new Date(Date.now() + 3600000);

        // Create new User and save
        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
            verifyTokenExpiry: emailVerificationTokenExpiry,
        });
        const savedUser = await newUser.save();

        // Send verification email to client
        await sendEmail({ email: email, emailType: 'VERIFY', userId: savedUser._id });
        return NextResponse.json({
            message: 'User registration successfull',
            success: true,
            savedUser
        });

    }
    catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}