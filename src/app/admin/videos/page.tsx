"use client";
import BreadCumsComponent from '@/components/BreadCums'
import React from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { RiEditBoxLine } from "react-icons/ri";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import Link from 'next/link';
import { toast } from 'sonner';
import { CgSpinner } from "react-icons/cg";
import { useGetAllNovelVideosQuery, useGetNovelVideoByIdAndDeleteMutation, useGetNovelVideoByIdAndToggleMutation } from '@/redux/queries/AdminNovel.query';
import { Loader } from '@/components/Loader';
import ErrorComponent from '@/components/ErrorComponent';
 
const TableRow = ({ index, data }: { index: number, data :any})=>{

  const [getNovelVideoByIdAndDelete, getNovelVideoByIdAndDeleteResponse] = useGetNovelVideoByIdAndDeleteMutation()
  const [ToggleNovel, ToggleNovelResponse] = useGetNovelVideoByIdAndToggleMutation()
  

 
  const deleteButton = async (id: number) => {
    const { data, error }: any = await getNovelVideoByIdAndDelete(id);
    if (error) { 

      toast.success(error.data.message);
      return
    }

    toast.success(data.msg)
  }


  const toggleBtn = async (id: number) => {
    const { data, error }: any = await ToggleNovel(id);
    if (error) {
      console.log(error);

      toast.success(error.data.message);
      return
    }

    toast.success(data.msg)
  }


  return <>
    <tr className="border-[.2px] w-full">
      <td className=' text-center py-2 border-[.2px]'>{index+1}</td>
      <td className=' text-center py-2 border-[.2px] capitalize'>{data.title}</td>
      <td className=' text-center py-2 border-[.2px] capitalize'>{data.novel.title}</td>
      <td className=' text-center py-2 border-[.2px]'>
        {data?.video_id}
      </td>
      <td className=' text-center py-2 border-[.2px] '>
          <div className="w-full justify-center  items-center">

          {data.isActive ?
            <span className="relative flex h-3 w-3 mx-auto">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            :
            <span className="relative flex h-3 w-3 mx-auto">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400" />
            </span>

          }
          </div>
      </td>
      <td className=' text-center py-2  flex justify-center gap-x-4 items-center'>
        {data.isActive ? <button onClick={() => toggleBtn(data._id)} disabled={ToggleNovelResponse.isLoading} className=' md:text-2xl text-xl' ><FcCheckmark /></button>
          : <button onClick={() => toggleBtn(data._id)} disabled={ToggleNovelResponse.isLoading} className=' md:text-2xl text-xl' ><FcCancel /></button>}
        <button   onClick={() => deleteButton(data._id)}  className=' md:text-2xl text-xl' >
          {
            getNovelVideoByIdAndDeleteResponse.isLoading ? <CgSpinner className='text-xl text-black animate-spin' /> : <AiOutlineDelete />
          }
        
          </button>
        <Link href={'/admin/videos/edit/' + data._id} className=' md:text-2xl text-xl' ><RiEditBoxLine /></Link>

      </td>
    </tr>
  </>
}

const VideoPage = () => {

  const {data,isError,isLoading }:any = useGetAllNovelVideosQuery({})

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <ErrorComponent />
  }

  return (
  <>
        <BreadCumsComponent link='/videos' pageName='All Videos' />

            <div className="w-full"> 
              <table className="w-full border-[.2px] overflow-auto ">
                <thead className="border-[.2px] w-full">
            <th className='border-[.2px] select-none'>ID</th>
            <th className='border-[.2px] select-none'>Title</th>
            <th className='border-[.2px] select-none'>Novel</th>
            <th className='border-[.2px] select-none'>Video ID</th>
            <th className='border-[.2px] select-none'>isPublish</th>
            <th className='border-[.2px] select-none'>Actions</th>
                </thead>
                  <tbody className='w-full'>
                    {
                    data && data.videos && data.videos.length>0 && data.videos.map((cur:any,i:number)=>{
                        return <TableRow data={cur} key={i} index={i} />
                      })
                    }
                  </tbody>
              </table>
            </div>
  </>
  )
}

export default VideoPage