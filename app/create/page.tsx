"use client";
import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputPost } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreatePage() {
  const router = useRouter()
  const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
    createPost(data);
  };
  const {mutate: createPost, isPending} = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      return axios.post("/api/posts/create", newPost);
    },
    onError: (error) => {
      toast.error("Error creating post")
      console.error("error");
    },
    onSuccess: () => {
      toast.success("Post created successfully")
      router.replace("/"); 
      router.refresh()
    },
  })
  return (
    <>
      <BackButton />
      <h1 className="text-2xl my-4 font-bold text-center">Add New Post</h1>
      <FormPost submit={handleCreatePost} isEditing={false} isPending={isPending} />
    </>
  );
}
