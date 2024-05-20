import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import User from "@/components/lib/UserModel/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

export const POST = async (req) => {

    try {
        await ConnectDatabase()
        const reqBody = await req.json();
        const { email, password } = reqBody;

        // Validation
        console.log('Req Body: ', reqBody)
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: 'User does not exists' }, { status: 400 })
        }
        console.log('User Exits: ', user);

        const validatePassword = await bcryptjs.compare(password, user.password);

        if (!validatePassword) {
            return NextResponse.json({ error: 'Check your credentials' }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: 'Loged In',
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true
        });
        return response
    }
    catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}