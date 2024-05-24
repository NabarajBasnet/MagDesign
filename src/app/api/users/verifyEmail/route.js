// Email verification

import User from "@/components/lib/UserModel/userModel";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        await ConnectDatabase();

        // Extract token from url
        const newUrl = new URL(req.url);
        const hashedToken = newUrl.searchParams.get('token');

        // Find user
        const user = await User.findOne({
            verifyToken: hashedToken,
            // verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                error: 'Invalid token!',
                success: false
            }, { status: 400 })
        };

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save();

        return NextResponse.json({
            message: 'Email verification successfull',
            success: true
        }, { status: 200 });

    } catch (error) {
        console.log('Error: ', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}