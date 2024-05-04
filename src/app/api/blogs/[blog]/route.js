import BlogPost from "@/components/lib/BlogsSchema/blogschema";
import connectionStr from "@/components/lib/DB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, content) => {
    try {
        await mongoose.connect(connectionStr);
        const blogId = content.params.blog;
        const filter = { _id: blogId };
        console.log(filter);
        const blog = await BlogPost.find(filter);
        return NextResponse.json({ result: blog });

    }
    catch (error) {
        console.log(error)
    }
}


export const PUT = async (req, content) => {
    try {
        const payload = await req.json();
        console.log('Payload: ', payload);
        await mongoose.connect(connectionStr);
        const blogId = content.params.blog;
        const filter = { _id: blogId };
        const updatedBlog = await BlogPost.findByIdAndUpdate(filter, payload);
        return NextResponse.json({ result: updatedBlog });
    }
    catch (error) {
        console.log(error)
    }

}



export const DELETE = async (req, content) => {
    try {

        await mongoose.connect(connectionStr);
        const blogId = content.params.blog;
        const data = await BlogPost.findByIdAndDelete(blogId);
        return NextResponse.json({ result: data, success: true });

    }
    catch (error) {
        console.log(error)
    }
}


