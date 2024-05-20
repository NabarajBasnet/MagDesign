// Email verification route

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import User from "@/components/lib/UserModel/userModel";


export const POST = async (req) => {
    if (mongoose.connection.readyState >= 1) {
        console.log('Using existing database connection');
    }

    try {
        // Connect database
        await ConnectDatabase();

        // Extract token from url
        const url = new URL(req.url);
        const token = url.searchParams.get('token');

        // Verify user
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()},
        });

        if (!user) {
            return NextResponse.json({
                error: 'Invalid token!',
                ok: false
            }, { status: 400 });
        };

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        // Save user
        await user.save();

        return NextResponse.json({
            message: 'Email verified successfully',
            ok: true,
        }, { status: 200 })

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}