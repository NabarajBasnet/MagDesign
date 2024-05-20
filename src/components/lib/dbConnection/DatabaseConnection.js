import mongoose from "mongoose"
import { NextResponse } from "next/server";

const ConnectDatabase = async () => {

  if (mongoose.connection.readyState >= 1) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const username = process.env.DATABASE_USERNAME;
    const password = process.env.DATABASE_PASSWORD;

    if (!username || !password) {
      throw new Error('Database username or password not set in environment file')
    }

    const DB_URI = `mongodb+srv://${username}:${password}@cluster0.uv6odwq.mongodb.net/magdesign?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(DB_URI, {
      userNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log('Error: ', error);
    return NextResponse.json({ error: 'Error connecting to database!' });
  }
};

export default ConnectDatabase;
