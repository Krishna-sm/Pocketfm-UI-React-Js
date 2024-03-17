"use client";
import { useAddVideochatMutation } from '@/redux/queries/PublicNovel.query';
import { useParams } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { IoMdSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg'
import { useSelector } from 'react-redux';
import { UserSelector } from '@/redux/slices/User.slice';
import { GoKebabHorizontal } from "react-icons/go";
import moment from 'moment';



export const ChatForm = () => {

    const userSelector = useSelector(UserSelector);

    const { slug, videoSlug }: { slug:string, videoSlug:string } = useParams()
    const [ AddVideoChat,AddVideoChatResponse ] = useAddVideochatMutation()
    const onChatSent =async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submission behavior
        if (!userSelector){
                    toast.error("plese login first");
            return 
        }
        try {
            const formData = new FormData(e.target as HTMLFormElement); // Creates a new FormData object from the form target
            const chat = formData.get("chat-data") as string // Retrieves the value of the form field with the name "chat-data" and logs it
            if (!chat){
            return
            }
            const {data,error }:any = await AddVideoChat({ comment: chat, slug: slug, videoSlug: videoSlug })
          
                            if(error){
                                toast.error(error.data.message);
                                return
                            }
                            toast.success(data.msg);

            // @ts-ignore
            e?.target.reset(); // Resets the form after submission
        } catch (error: any) {
            toast.error(error.message); // If an error occurs during form submission, it displays an error message
        }
    }


    return <>

        <form onSubmit={onChatSent} className="chat-box w-full flex items-center absolute bottom-0 bg-gray-800 py-3 ">
            <input name="chat-data" type="text" className="w-full border py-4 rounded-tr-full rounded-br-full px-4 border-none outline-none " placeholder='Enter something...' />
            <button disabled={AddVideoChatResponse.isLoading}  className='  p-3 rounded-full text-center '>
                {
                    AddVideoChatResponse.isLoading?<>
                        
                        <CgSpinner className='text-2xl animate-spin transition-all duration-300 bg-transparent text-white ' />

                    </>:<>
                    <IoMdSend className='text-2xl bg-transparent text-white ' />
                    </>
                }
            </button>
        </form>
    </>
}


export const ChatCard = ({ id, username, comment, date }: { id: number, username: string, comment: string, date :string}) => {
   
            const[isShow,setIsShow] = useState(false)
   return <>
        <div id={id} className="card flex items-start w-full px-5 py-4 border-b  relative">
            <div className="w-[100px]">
                <img src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" className="w-[100px] rounded-full " alt="" />
            </div>
            <div className="flex w-full py-2 flex-col items-start justify-start bg-transparent">
                <p className='text-sm text-zinc-400 select-none' >@{username}</p>
                <p className='text-lg  text-gray-800 inline-flex items-end flex-col' >{comment.trim().length > 20 ? <>
                   {isShow ?comment:comment.slice(0, 30) + "..."}
                   <span onClick={() => setIsShow(!isShow)} className="text-blue-500 text-sm text-nowrap select-none cursor-pointer">{isShow ? 'Read Less' :'Read More'}</span>
                
                </> : comment}</p>
               <p className="text-xs text-zinc-400 font-thin select-none text-ellipsis text-wrap">{moment(date).startOf('hour').fromNow()}</p>
            </div>
            <div className=" px-4 pt-4 ">
                <GoKebabHorizontal className='rotate-90 cursor-pointer' />
            </div>


        </div>
    </>
}
