import { db } from "@/libs/db";
import { NextResponse } from "next/server";

type TcontextProps = {
    params: {
        postId: string
    }

}
export async function GET(req: Request, context: TcontextProps) {
    try {
        const postById = await db.post.findFirst({
            where:{
                id: context.params.postId
            },include:{
                tag: true 
            }
        })
        return NextResponse.json(postById,{status:200, statusText: "OK"});
    } catch (error) {
        return NextResponse.json({message:"could not fetch post"},{status:500, statusText: "Internal Server Error"});
    }
}
export async function DELETE(req: Request, context: TcontextProps) {
    try {
        const post = await db.post.delete({
            where:{
                id: context.params.postId
            }
        })
        return new Response(null,{status:204, statusText: "Post Deleted."});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"could not delete Post."},{status:500, statusText: "Internal Server Error"});
    }
}
export async function PATCH(req: Request, context: TcontextProps) {
    try {
        const body = await req.json();
        const post = await db.post.update({
            where:{
                id: context.params.postId
            },
            data:{
                title: body.title,
                content: body.content,
                tagId: body.tag,
            }
        })
        return NextResponse.json(post,{status:200, statusText: "Post Updated"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"could not update Post."},{status:500, statusText: "Internal Server Error"});
    }
}