"use client";
import { FormInputPost } from "@/types";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
  isPending?: boolean;
  initialValue?: FormInputPost;
}

const FormPost: FC<FormPostProps> = ({
  submit,
  isEditing,
  isPending,
  initialValue,
}) => {
  const { register, handleSubmit } = useForm<FormInputPost>({
    defaultValues: initialValue,
  });

  // fetch list of tags
  const { data: tagsData, isLoading } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axios.get("/api/tags");
      return res?.data;
    },
  });
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-5 mt-10 p-5"
    >
      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: true })}
        className="input input-bordered w-full max-w-lg"
      />
      <textarea
        className="textarea textarea-bordered w-full max-w-lg"
        {...register("content", { required: true })}
        placeholder="Type here"
      ></textarea>
      {isLoading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        <select
          {...register("tag", { required: true })}
          className="select select-bordered w-full max-w-lg"
          defaultValue=''
        >
          <option disabled value={''}>
            Select Tag
          </option>
          {tagsData?.map((tag) => ( <option key={tag.id}  value={tag.id}> {tag.name} </option> ))} 
         
        </select>
      )}

      <button type="submit" className="btn btn-primary w-full max-w-lg">
        {isPending && <span className="loading loading-dots loading-md"></span>}
        {isEditing ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default FormPost;
