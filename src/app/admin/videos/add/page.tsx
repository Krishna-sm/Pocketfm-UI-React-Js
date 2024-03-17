"use client";
import BreadCumsComponent from "@/components/BreadCums";
import React, { useEffect } from "react";

import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import * as commands from "@uiw/react-md-editor/commands";
import rehypeSanitize from "rehype-sanitize";
import * as yup from "yup";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Formik } from "formik";
import ErrorComponent from "@/components/ErrorComponent";
import { useAddNovelVideoMutation, useGetAllNovelsQuery } from "@/redux/queries/AdminNovel.query";
import { Loader } from "@/components/Loader";
import SubmitButton from "@/components/SubmitButton";
const AddVideoPage = () => {
    const { isError,data,isLoading }:any = useGetAllNovelsQuery({})
  const [AddNovelVideo,AddNovelVideoResponse] = useAddNovelVideoMutation()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorComponent />
  }

  const Schema = yup.object({
    novel: yup.string().required("Novel Id Required"),
    title: yup.string().required("title is required"),
    data: yup.string().optional(),
    video_id: yup
      .string()
      .required("Video id is Required")
      .matches(/^[a-zA-Z0-9_-]{11}$/, "Invalid YouTube video ID"),
  });
 
  const initalValue= {
    novel: '',
    title: '',
    data: '',
    video_id: '',
  }


  const onSubmitHandler = async (e: any, { resetForm }: any) => {
    try {
      // console.log(e);

      const { data, error }: any = await AddNovelVideo(e);
      if (error) {
        toast.error(error.data?.message);
        return
      }
      toast.success(data.msg);
      resetForm()
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  function onImageUpload(file: any) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data: any) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <>
      <BreadCumsComponent link="/videos/add" pageName="Add Video" />
      <div className="w-full ">

        <Formik onSubmit={onSubmitHandler} initialValues={initalValue} validationSchema={Schema} >
                        {({values,setFieldValue , handleSubmit})=>(
            <form onSubmit={handleSubmit} className=" w-full md:w-[70%] mx-auto min-h-28 shadow-md py-5  rounded-lg">
              <div className="w-full px-5 py-2 flex flex-col gap-y-3 mb-3">
                <label htmlFor="novel">Novel</label>
                <Field
                as="select"
                  name="novel"
                  className="w-full rounded-md border-[.2px] outline-none px-4 py-2"
                >
                  <option value="" disabled>
                    Select Novel
                  </option>
                  {data && data.novels && data.novels.length>0 &&data.novels.map((cur:any,i:number)=>{
                   return <option className="capitalize"  key={i} value={cur._id} >
                   {i+1}.  {cur.title}
                   </option>
                 })}
                </Field>
                <ErrorMessage name="novel" className="text-red-500" component={'p'} />
              </div>

              <div className="w-full px-5 py-2 flex flex-col gap-y-3 mb-3">
                <label htmlFor="Title">Title</label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter Title"
                  className="w-full rounded-md border-[.2px] outline-none px-4 py-2"
                />
                <ErrorMessage name="title" className="text-red-500" component={'p'} />
              </div>
              <div className="w-full px-5 py-2 flex flex-col gap-y-3 mb-3">
                <label htmlFor="Title">Novel Data  </label>
                {/* <textarea rows={3} name='data'   placeholder='Enter Data' className="w-full rounded-md border-[.2px] outline-none px-4 py-2" /> */}
                <MDEditor
                  value={values.data}
                  className=" selection:bg-white text-black"
                  style={{
                    minHeight: "50vh",
                  }}
                  tw="selection:bg-white text-black"
                  highlightEnable
                  unselectable="on"
                  color="black"
                  //@ts-ignore
                  onChange={(val)=> setFieldValue('data',val)}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                />
                <ErrorMessage name="data" className="text-red-500" component={'p'} />
              </div>
              <div className="w-full px-5 py-2 flex flex-col gap-y-3 mb-3">
                <label htmlFor="Title">Video ID</label>
                <Field
                  name="video_id"
                  placeholder="Enter Yt  Video Id"
                  className="w-full rounded-md border-[.2px] outline-none px-4 py-2"
                />
                <ErrorMessage name="video_id" className="text-red-500" component={'p'} />

              </div>
              <div className="w-full px-5 py-2   flex justify-end gap-y-3 mb-3">
                <SubmitButton isLoading={AddNovelVideoResponse.isLoading} type="submit" className="sm:w-full bg-indigo-600 px-10  text-white hover:bg-indigo-800 py-3 rounded-md">
                  Add Video
                </SubmitButton>
              </div>
            </form>
                        )}
            </Formik>

      </div>
    </>
  );
};

export default AddVideoPage;
