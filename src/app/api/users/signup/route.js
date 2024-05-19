import User from "@/components/lib/UserModel/userModel";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import sendEmail from "@/utils/mailer";
import bcryptjs from 'bcryptjs'
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await ConnectDatabase();

        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        console.log('Request body: ', reqBody);

        // Validate User
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: 'User Exists!' })
        }

        // Secure password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create New User
        const newUser = await new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log('Saved User: ', savedUser);
        console.log('User Id: ', savedUser._id)

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
        return NextResponse.json({
            message: 'User registration successfull',
            success: true,
            savedUser,
        });

    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json({
            'Error': error.message
        });
    }
}