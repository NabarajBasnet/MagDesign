// Logout route

import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        if (mongoose.connection.readyState < 1) {
            await ConnectDatabase();
        };

        const response = NextResponse.json({
            message: 'Loged out successfully',
            success: true,
        });

        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
        })
        return response;

    } catch (error) {
        console.log('Error: ', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}