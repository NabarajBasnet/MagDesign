import BlogPost from "@/components/lib/BlogsSchema/blogschema";
import connectionStr from "@/components/lib/DB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await mongoose.connect(connectionStr);
        const blogposts = await BlogPost.find();
        return NextResponse.json({ result: blogposts, success: true })

    }
    catch (error) {

    }
}


export const POST = async (req) => {
    try {
        await mongoose.connect(connectionStr);
        const blogPayload = await req.json();
        const newData = new BlogPost(blogPayload);
        const finalBogPost = newData.save();
        return NextResponse.json({ result: finalBogPost, success: true })
    }
    catch (error) {
        console.log(error)
    }
}


