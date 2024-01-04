import { Post, Tag } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

interface PostCardProps {
 post:{
  id: string;
  title: string;
  content: string;
  tag: Tag
 }
}

const PostCard: FC<PostCardProps> = function ({post}) {
  const {id, title, content, tag} = post
  return (
    <div className="card w-full bg-base-100 shadow-xl border"> 
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className=" overflow-hidden text-ellipsis">{content}</p>  
        <div className="card-actions justify-end items-center">
        <div className="badge badge-ghost">{tag.name}</div>
          <Link href={`/blog/${id}`} className="btn btn-ghost hover:underline dark:text-white">Read More</Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard 