import { NextResponse } from "next/server"
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection"
import User from "@/components/lib/UserModel/userModel";
import getDataFromToken from "@/utils/getDataFromToken";


export const POST = async (req) => {
    try {
        await ConnectDatabase();

        // extract data from token
        const userId = await getDataFromToken(req)
        const user = await User.findOne({ _id: userId }).select("-password");
        // check id there in no user
        return NextResponse.json({
            message: 'User found',
            data: user
        });

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}