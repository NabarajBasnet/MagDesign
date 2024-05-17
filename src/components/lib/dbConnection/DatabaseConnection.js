import mongoose from "mongoose"
import { NextResponse } from "next/server";

const ConnectDatabase = async () => {
  try {
    const username = process.env.DATABASE_USERNAME;
    const password = process.env.DATABASE_PASSWORD;

    const DB_URI = `mongodb+srv://${username}:${password}@cluster0.uv6odwq.mongodb.net/magdesign?retryWrites=true&w=majority&appName=Cluster0`;
    const req = await mongoose.connect(DB_URI);
    console.log('Database connected')
    return NextResponse.json({success: true})
  } catch (error) {
    console.log('Error: ', error);
    return NextResponse.json({ error: 'Error connecting to database!' });
  }
};

export default ConnectDatabase;
