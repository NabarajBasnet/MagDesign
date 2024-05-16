import mongoose from "mongoose"
import { NextResponse } from "next/server";

const Database_username = process.env.DATABASE_USERNAME
const Database_password = process.env.DATABASE_PASSWORD

const ConnectDatabase = async () => {
    try {
        const DB_URI = `mongodb+srv://${Database_username}:${Database_password}@cluster0.uv6odwq.mongodb.net/magdesign?retryWrites=true&w=majority&appName=Cluster0`;
        const req = await mongoose.connect(DB_URI);
        console.log(req);
        console.log('Connected to Mongo DB')
    }
    catch (error) {
        console.log(error)
        console.log('Error in connecting to database')
        return NextResponse.json({error: 'Error connecting to database!'})
    }

}

export default ConnectDatabase;
