import User from "@/components/lib/UserModel/userModel";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import { getDataFromToken } from "@/utils/GetDataFromToken";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        if(mongoose.connection.readyState <1 ){
            await ConnectDatabase();
        }
        const userId = await getDataFromToken(req);
        console.log('User Id: ', userId);

        const user = await User.findOne({_id: userId}).select('-password')
        return NextResponse.json({
            message: 'User found',
            data: user
        });

    } catch (error) {
        console.log('Error: ', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}