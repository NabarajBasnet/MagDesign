import BlogPost from "@/components/lib/BlogsSchema/blogschema";
import connectionStr from "@/components/lib/DB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async()=>
{
    await mongoose.connect(connectionStr);
    const blogposts = await BlogPost.find();
    return NextResponse.json({result: blogposts, success: true})
}


export const POST = async(req)=>
{
    await mongoose.connect(connectionStr);
    const blogPayload = await req.json();
    const newData = new BlogPost(blogPayload);
    const finalBogPost = newData.save();

    return NextResponse.json({result: finalBogPost, success: true})
}


