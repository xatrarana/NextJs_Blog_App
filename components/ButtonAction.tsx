'use client';
import { Tag } from '@prisma/client';
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'
import toast from 'react-hot-toast';

type ButtonActionProps = {
  id: string;
}
const ButtonAction: FC<ButtonActionProps> = ({id}) => {
  const router = useRouter()
  const {mutate: deletePost, isPending} = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`)
    },
    onError: (error) => {
      console.error("error");
      toast.error("Error deleting post")
    },
    onSuccess: () => {
      toast.success("Post deleted successfully")
      router.replace("/");
      router.refresh()
    },
  })
  return (
    <div className='my-3'>
        <Link className='btn  mr-2 dark:hover:bg-slate-300 dark:bg-white dark:text-black' href={`/edit/${id}`}>
            <Pencil size={14}/>
            Edit</Link>
        <button className='btn btn-error' onClick={() => deletePost()}>
          {isPending ? <span className="loading loading-dots loading-md"></span> : (
            <>
            <Trash size={14}/>
            Delete
            </>
          )}
            </button>
    </div>
  )
}

export default ButtonAction