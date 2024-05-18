import BlogPost from "@/components/lib/BlogsModel/blogschema";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import { NextResponse } from "next/server";



export const GET = async (req) => {

    try {

        await ConnectDatabase();
        const url = new URL(req.url);
        const searchedQueryData = url.searchParams.get('search').toLowerCase();

        // Filter Blogs Based on searched query
        const allBlogPosts = await BlogPost.find({});
        const filteredBlogPosts = allBlogPosts.filter(post => post.title.toLowerCase().includes(searchedQueryData))
        return NextResponse.json({ result: filteredBlogPosts, success: true, '200ok': true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message })
    }
}