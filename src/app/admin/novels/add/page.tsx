"use client";
import BreadCumsComponent from '@/components/BreadCums'
import SubmitButton from '@/components/SubmitButton';
import { useAddNovelMutation } from '@/redux/queries/AdminNovel.query';
import { ErrorMessage, Field, Formik } from 'formik'
import React, { useRef } from 'react'
import { toast } from 'sonner';
import * as yup from 'yup'


const AddVideoPage = () => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [AddNovel,AddNovelResponse] = useAddNovelMutation()

  const validationSchema = yup.object({
    title:yup.string().required("Novel Title is Required"),
    desc:yup.string().required("Novel Desc Required"),
    image:yup.mixed().required("Image is required")
  }) 

  const initalValues = {
    title:'',
    desc:'',
    image:null
  }

  const onSubmitHandler = async(e:any,{resetForm}:any)=>{
        try {
          // console.log(e);
          const formData = new FormData()
          formData.append("title", e.title)
          formData.append("desc", e.desc)
          formData.append("image", e.image)

          const { data,error}:any = await AddNovel(formData);
          if(error){
            toast.error(error.data?.message);
            return
          }
              toast.success(data.msg);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          resetForm()
        } catch (error:any) {
              toast.error(error.message);
        }
  }

  return (
    <>
            <BreadCumsComponent link='/novels/add' pageName='Add Novel' />  
                <div className="w-full ">


                      <Formik initialValues={initalValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
                                    {({values,handleSubmit,setFieldValue})=>(
            <form onSubmit={handleSubmit}   className=" w-full md:w-[70%] mx-auto min-h-28 shadow-md py-5  rounded-lg">
               

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

                    
                    
                <input ref={fileInputRef} id='image' type='file' onChange={(e:any)=>{
                  if (e.target.files) { 
                    
                    setFieldValue('image', e.target.files[0])
                  }
                }}   placeholder='Enter Yt  Video Id' className="w-full rounded-md border-[.2px] outline-none px-4 py-2" />

                <ErrorMessage name='image' component={'p'} className='text-red-500 text-sm' />
              </div>
              <div className="w-full px-5 py-2   flex justify-end gap-y-3 mb-3">
                <SubmitButton isLoading={AddNovelResponse.isLoading} type='submit' className="sm:w-full bg-indigo-600 px-10  text-white hover:bg-indigo-800 py-3 rounded-md">Add </SubmitButton>
              </div>
            </form> 
                      )}
                      </Formik>

                </div>

    </>
  )
}

export default AddVideoPage