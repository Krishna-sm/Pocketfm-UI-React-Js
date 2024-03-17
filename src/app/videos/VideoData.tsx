"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import { FaRegCirclePlay } from 'react-icons/fa6';
import moment from 'moment'

export const Card = ({ data: { title, slug, createdAt }, image }: { data: { title: string, slug: string, createdAt:string }, image: string, }) => {
    const param = useParams()
    return <>

       <div className="w-full">
            <Link href={`/novels/${param.slug}/${slug}`} className="card cursor-pointer w-full transition-all duration-300 flex items-center rounded border py-3 px-2 my-2 ">
                <img src={image} className=' w-[100px] lg:w-[100px]  h-[100px] lg:h-[100px] rounded-full object-cover px-3 py-2 ' alt="" />
                <div className="flex flex-col items-start px-3">
                    <h1 className=" text-lg lg:text-xl font-regular">{title}</h1>
                    <p className="text-sm text-zinc-500 font-thin text-ellipsis text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p className="text-xs text-zinc-400 font-thin select-none text-ellipsis text-wrap">{moment(createdAt).startOf('hour').fromNow()}</p>
                </div>
                <FaRegCirclePlay className='text-4xl cursor-pointer' />
            </Link>
       </div>
    </>
}