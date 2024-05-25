// Login route

import User from "@/components/lib/UserModel/userModel";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const POST = async (req) => {
    try {
        await ConnectDatabase();

        // Extract credentials from request body
        const reqBody = await req.json();
        const { email, password } = reqBody;

        // Validate user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User doesn't exists!" }, { status: 400 });
        }

        // Validate if user is verified
        const isVerified = await User.findOne({ isVerified: true });
        if (!isVerified) {
            return NextResponse.json({ error: 'Verify your email first' }, { status: 401 });
        }

        // Validate password 
        const validatePassword = await bcryptjs.compare(password, user.password);
        if (!validatePassword) {
            return NextResponse.json({ error: "Invalid password!" }, { status: 402 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        const response = NextResponse.json({
            message: 'Loged In successfully',
            success: true,
            data: token
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response

    } catch (error) {
        console.log('Error: ', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}