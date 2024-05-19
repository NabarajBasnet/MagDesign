import User from "@/components/lib/UserModel/userModel";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await ConnectDatabase();

        // User verification
        const reqBody = await req.json();
        const { token } = reqBody;
        console.log('Token: ', token);
        
        const user = await User.findOne(
            {
                verifyToken: token,
                verifyTokenExpiry: { $gt: Date.now() }
            }
        );
        console.log('User Verify Email: ', user)

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        console.log('User: ', user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({
            message: 'Email verified successfully',
            success: true,
        });

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
