import BackButton from "@/components/BackButton";
import ButtonAction from "@/components/ButtonAction";
import { db } from "@/libs/db";
import React, { FC } from "react";

type BlogDetailPageProps = {
  params: {
    id: string;
  };
};
const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  const postById = await getPostById(params.id);
  console.log("post by id", postById);  
  return (
    <>
      <div className="mb-5 flex items-center gap-4">
        <BackButton />
        <h2 className="text-2xl font-bold my-4">{postById?.title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="badge badge-ghost">{postById?.tag.name}</div>
        <ButtonAction id={params.id}/>
      </div>
      <p className="text-slate-700 dark:text-neutral-300">
        {postById?.content}
      </p>
    </>
  );
};

async function getPostById(id: string){
  const res = await db.post.findFirst({
    where: {
      id,
    },
    select:{
      id:true,
      title:true,
      content:true,
      tag:true
    }
  });
  return res;
}

export default BlogDetailPage;
