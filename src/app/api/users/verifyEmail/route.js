import BlogPost from "@/components/lib/BlogsModel/blogschema"
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import { NextResponse } from "next/server"


export const GET = async () => {
    try {
        await ConnectDatabase();
        const data = await BlogPost.find();
        return NextResponse.json({ result: data })
    } catch (error) {
        return NextResponse.json({ error: 'Error found!' })
    }
}
