import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const body = await req.json();
        const post = await db.post.create({
            data:{
                title: body.title,
                content: body.content,
                tagId: body.tag,
            }
        })
        return NextResponse.json(post,{status:201, statusText: "Post Created"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"could not create Post"},{status:500, statusText: "Internal Server Error"});
    }
}