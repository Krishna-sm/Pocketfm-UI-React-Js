"use client";
import BreadCumsComponent from '@/components/BreadCums'
import React from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { RiEditBoxLine } from "react-icons/ri";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import Link from 'next/link';
import { toast } from 'sonner';
import { CgSpinner } from "react-icons/cg";
import { useGetAllNovelsQuery, useGetNovelByIdAndDeleteMutation, useGetNovelByIdAndToggleMutation } from '@/redux/queries/AdminNovel.query';
import { Loader } from '@/components/Loader';
import ErrorComponent from '@/components/ErrorComponent';
 
const TableRow = ({ index, data }: { index: number, data :any})=>{
  const [DeleteNovel, DeleteNovelResponse] = useGetNovelByIdAndDeleteMutation()
  const [ToggleNovel, ToggleNovelResponse] = useGetNovelByIdAndToggleMutation()


  

  const deleteButton = async(id:number)=>{
    const {  data,error }:any = await DeleteNovel(id);
    if (error){
      console.log(error);
      
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
      <td className='py-2 border-[.2px]'>{index+1}</td>
      <td className='py-2 border-[.2px]'>{data.title}</td>
      <td className=' flex justify-center items-center py-2 border-[.2px]'>
        <img src={data.image.uri} className=' w-[40%] lg:w-[5%]' alt="" />
      </td>
      
      <td className='  py-2 border-[.2px] '>
          <div className="w-full justify-center  items-center">

          {!data.isActive ?
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
      <td className='  py-2  flex justify-center gap-x-4 items-center '>
        {!data.isActive ? <button onClick={() => toggleBtn(data._id)} className=' md:text-2xl text-xl' ><FcCheckmark /></button>
          : <button onClick={() => toggleBtn(data._id)} className=' md:text-2xl text-xl' ><FcCancel /></button>}
        <button onClick={() => deleteButton(data._id)}  className=' md:text-2xl text-xl' >
          
          {DeleteNovelResponse.isLoading ? <CgSpinner className='animate-spin text-xl text-black'  /> : <AiOutlineDelete />   }
        </button>
        <Link href={'/admin/novels/edit/'+data._id} className=' md:text-2xl text-xl' ><RiEditBoxLine /></Link>

      </td>
    </tr>
  </>
}

const VideoPage = () => {

  const { data,isLoading,isError }:any = useGetAllNovelsQuery({});

  if (isLoading){
    return <Loader/>
  }
  if (isError){
    return <ErrorComponent/>
  }

  return (
  <>
        <BreadCumsComponent link='/novels' pageName='All Novels' />

            <div className="w-full">
              <table className="w-full border-[.2px] overflow-auto ">
                <thead className="border-[.2px] w-full">
            <th className='border-[.2px] select-none'>ID</th>
            <th className='border-[.2px] select-none'>Title</th>
            <th className='border-[.2px] select-none'>Image</th>
            <th className='border-[.2px] select-none'>isPublish</th>
            <th className='border-[.2px] select-none'>Actions</th>
                </thead>
                  <tbody className=''>
                    {
              data && data.novels && data.novels.length>0 && data.novels.map((cur:any,i:number)=>{
                return <TableRow key={i} index={i} data={cur} />
                      })
                    }
                  </tbody>
              </table>
            </div>
  </>
  )
}

export default VideoPage