import BlogPost from "@/components/lib/BlogsSchema/blogschema";
import connectionStr from "@/components/lib/DB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, content) => {

    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const limit = url.searchParams.get('limit');
    console.log('Page: ', page);
    console.log('Limit: ', limit);

    try {
        await mongoose.connect(connectionStr);
        const blogPosts = await BlogPost.find().limit(limit);
        return NextResponse.json({ result: blogPosts, success: true, ok: true, request: req });
    } catch (error) {
        console.error(error);
        return NextResponse.error(error);
    }
};


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


