"use client";
import BreadCumsComponent from '@/components/BreadCums'
import ErrorComponent from '@/components/ErrorComponent';
import { Loader } from '@/components/Loader';
import SubmitButton from '@/components/SubmitButton';
import GoBack from '@/components/reuseable/GoBack'
import { useGetAllNovelsQuery, useGetNovelVideoByIdAndUpdateMutation, useGetNovelVideoByIdQuery } from '@/redux/queries/AdminNovel.query'
import MDEditor from '@uiw/react-md-editor';
import { ErrorMessage, Field, Formik } from 'formik';
import * as yup from 'yup'
import React from 'react'
import { toast } from 'react-toastify';
import rehypeSanitize from 'rehype-sanitize';

const EditPage = ({params}:{params:{slug:string}}) => {

  const {  data,isLoading,isError }:any = useGetNovelVideoByIdQuery(params.slug);
  const [getNovelVideoByIdAndUpdate, getNovelVideoByIdAndUpdateResponse] = useGetNovelVideoByIdAndUpdateMutation()
  const AllNovelQuery:any = useGetAllNovelsQuery({})
  if (isLoading || AllNovelQuery.isLoading) {
    return <Loader />
  }
  if (isError || AllNovelQuery.isError) {
    return <ErrorComponent />
  }


  const Schema = yup.object({
    novel: yup.string().required("Novel Id Required"),
    title: yup.string().required("title is required"),
    desc: yup.string().optional(),
    video_id: yup
      .string()
      .required("Video id is Required")
      .matches(/^[a-zA-Z0-9_-]{11}$/, "Invalid YouTube video ID"),
  });


  const initalValue = {
    title: data.title,
    video_id: data.video_id,
    desc: data.desc,
    novel: data.novel,
  }

  const onSubmitHandler = async (e: any, { resetForm, setValues }: any) => {
    try {
              console.log(e);
              
      const { data, error }: any = await getNovelVideoByIdAndUpdate({ id: params.slug, obj: e });
      if (error) {
        toast.error(error.data?.message);
        return
      }
      toast.success(data.msg);
    
      resetForm()

      setValues({
        title: e.title,
        video_id: e.video_id,
        desc: e.desc,
        novel: e.novel,
      })


    } catch (error: any) {
      toast.error(error.message)
    }
  }




  return (
    <>

    <GoBack/>
                <BreadCumsComponent link='/videos' pageName='Edit Page' />
                 
        <div className="w-full  flex items-start shadow-md  flex-col-reverse lg:flex-row justify-between md:px-10">

        <Formik onSubmit={onSubmitHandler} initialValues={initalValue} validationSchema={Schema} >
          {({ values, setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit} className=" w-full md:w-[80%] mx-auto min-h-28 shadow-md py-5  rounded-lg">
              <div className="w-full px-5 py-2 flex flex-col gap-y-3 mb-3">
                <label htmlFor="novel">Novel  </label>
                <Field
                  as="select"
                  name="novel"
                  className="w-full rounded-md border-[.2px] outline-none px-4 py-2"
                >
                  <option value="" disabled>
                    Select Novel 
                  </option>
                  {AllNovelQuery.data && AllNovelQuery.data.novels && AllNovelQuery.data.novels.length > 0 && AllNovelQuery.data.novels.map((cur: any, i: number) => {
                    return <option selected={cur._id === values.novel} className="capitalize" key={i} value={cur._id} >
                      {i + 1}.  {cur.title}
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
                  value={values.desc}
                  className=" selection:bg-white text-black"
                  style={{
                    minHeight: "50vh",
                  }}
                  tw="selection:bg-white text-black"
                  highlightEnable
                  unselectable="on"
                  color="black"
                  //@ts-ignore
                  onChange={(val) => setFieldValue('desc', val)}
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
                <SubmitButton isLoading={getNovelVideoByIdAndUpdateResponse.isLoading} type="submit" className="sm:w-full bg-indigo-600 px-10  text-white hover:bg-indigo-800 py-3 rounded-md">
                  Add Video
                </SubmitButton>
              </div>
            </form>
            
          )}
        </Formik>


        <div className=" w-full md:w-[60%] mx-auto min-h-28 shadow-md py-5  rounded-lg"> 
          <iframe  className='w-full min-h-[40vh]' src={`https://www.youtube.com/embed/${data?.video_id}`}>
</iframe>



        </div>
        </div>

 
    </>
  )
}

export default EditPage