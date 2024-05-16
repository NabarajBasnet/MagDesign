import mongoose from "mongoose";
import ConnectDatabase from "@/components/lib/dbConnection/DatabaseConnection";
import { NextResponse } from "next/server";

export const GET = async()=>
{
    try{
        
    }
    catch(error){
        return NextResponse.json({error})
    }
    await ConnectDatabase()
    return NextResponse.json({data: true, success: true})
}

