'use client';
import BackButton from '@/components/BackButton';
import FormPost from '@/components/FormPost';
import { FormInputPost } from '@/types';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter }  from 'next/navigation';
import React, { FC } from 'react'
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

type EditPageProps = {
    params: {
        id: string
    }
}
const EditPage: FC<EditPageProps> = ({params}) => {
    const {id} = params
    const router = useRouter()
    const {data: postData, isLoading} = useQuery<FormInputPost>({
        queryKey:['post',id],
        queryFn: async () => {
            const res = await axios.get(`/api/posts/${id}`);
            return res.data
        }
    })
    const {mutate: updatePost, isPending} = useMutation({
        mutationFn: (updatedPost:FormInputPost ) => {
        return axios.patch(`/api/posts/${id}`, updatedPost);
        },
        onError: (error) => {
        console.error("error");
        toast.error("Error updating post")
        },
        onSuccess: () => {
        toast.success("Post updated successfully")
        router.replace("/");
        router.refresh()
        },
    })
    const handleUpdatePost:SubmitHandler<FormInputPost> = (data) =>{
        updatePost(data)
    }
    if(isLoading){
        return (
            <div className=" flex items-center justify-center">
                <span className="loading loading-dots loading-md"></span>
            </div>
        )
    }
    return(
        <>
            <BackButton/>
            <h1 className="text-2xl my-2 font-bold text-center">
                Edit Post
            </h1> 
        <FormPost submit={handleUpdatePost} initialValue={postData} isEditing isPending={isPending}/>
        </>
    )
}

export default EditPage