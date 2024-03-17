"use client";
import BreadCumsComponent from '@/components/BreadCums'
import { Loader } from '@/components/Loader';
import SubmitButton from '@/components/SubmitButton';
import GoBack from '@/components/reuseable/GoBack'
import { useGetNovelByIdAndUpdateMutation, useGetNovelByIdQuery } from '@/redux/queries/AdminNovel.query';
import { ErrorMessage, Field, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import * as yup from 'yup'

const EditPage = ({params}:{params:{slug:string}}) => {
  const router = useRouter()

  const [getNovelByIdAndUpdate, getNovelByIdAndUpdateResponse] = useGetNovelByIdAndUpdateMutation()
  const { data,isLoading,isFetching ,isError}:any = useGetNovelByIdQuery(params.slug)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [variable, setCount] = useState(0);

  if (isLoading){
    return (
      <>
          <Loader/>
      </>
    )
  }
  if (isError){
    router.push("/admin/novels")
        return 
  }

  const initalValues = {
    title: data.novel.title,
    desc: data.novel.desc,
    image: null
  }


  // const setInitialValues = ()=>{
  //   initalValues.title= data.novel.title
  //     initalValues.desc= data.novel.desc
  // }

  const onSubmitHandler = async (e: any, { resetForm, setValues }:any)=>{
    try {

          const formData = new FormData();

      formData.append("title", e.title);
      formData.append("desc", e.desc);
      formData.append("image", e.image);
      const { data, error }: any = await getNovelByIdAndUpdate({ id:params.slug,obj:formData});
      if (error) {
        toast.error(error.data?.message);
        return
      }
      toast.success(data.msg);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

            
      setCount(variable + 1);
      resetForm()
      
      setValues({
        title:e.title,
        desc:e.desc
      })


    } catch (error:any) {
          toast.error(error.message)
    }finally{
      console.log({
        title: data.novel.title,
        desc: data.novel.desc,
        image: null
      });
            
      
    }
  }

  const validationSchema = yup.object({
    title: yup.string().required("title is required"),
    desc: yup.string().required("desc is required"),
    image: yup.mixed().notRequired(),
  })



  return (
    <>

    <GoBack/>
                <BreadCumsComponent link='/novels' pageName='Edit Page' />
                

      <div className="w-full  flex items-start shadow-md  flex-col-reverse lg:flex-row justify-between md:px-10">
    
        <Formik validationSchema={validationSchema} onSubmit={onSubmitHandler} initialValues={initalValues} > 

          {({ handleSubmit, setFieldValue ,values})=>(
            <form onSubmit={handleSubmit} className=" w-full md:w-[80%] mx-auto min-h-28  py-5  rounded-lg">


              <div className="w-full px-5 py-2 flex flex-col gap-y-3 mb-3">
                <label htmlFor="title">Title</label>
                <Field name='title' id="title" type="text" placeholder='Enter Novel Title' className="w-full rounded-md border-[.2px] outline-none px-4 py-2" />
                <ErrorMessage name='title' component={'p'} className='text-red-500 text-sm' />
              </div>
              <div className="w-full px-5 py-2 flex flex-col gap-y-3 mb-3">
                <label htmlFor="desc">Novel Data</label>
                <Field id="desc" as="textarea" rows={3} name='desc' placeholder='Enter Data' className="w-full rounded-md border-[.2px] outline-none px-4 py-2" />
                <ErrorMessage name='desc' component={'p'} className='text-red-500 text-sm' />
              </div>
              <div className="w-full px-5 py-2 flex flex-col gap-y-3 mb-3">
                <label htmlFor="video_id">Novel Image</label>



                <input ref={fileInputRef} id='image' type='file' onChange={(e: any) => {
                  if (e.target.files) {

                    setFieldValue('image', e.target.files[0])
                  }
                }} placeholder='Enter Yt  Video Id' className="w-full rounded-md border-[.2px] outline-none px-4 py-2" />

                <ErrorMessage name='image' component={'p'} className='text-red-500 text-sm' />
              </div>
              <div className="w-full px-5 py-2   flex justify-end gap-y-3 mb-3">
                <SubmitButton isLoading={getNovelByIdAndUpdateResponse.isLoading} type='submit' className="sm:w-full bg-indigo-600 px-10  text-white hover:bg-indigo-800 py-3 rounded-md">Update </SubmitButton>
              </div>
            </form>
                      )}
              </Formik>

        <div className=" w-[30%] md:w-[30%] mx-auto min-h-28 shadow-md py-5  rounded-lg">
          <img src={data?.novel?.image?.uri} alt={variable} />
        </div>
      </div>
    </>
  )
}

export default EditPage