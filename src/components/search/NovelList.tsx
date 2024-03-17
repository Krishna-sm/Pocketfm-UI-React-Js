"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import { FaRegCirclePlay } from "react-icons/fa6";
const NovelList = ({ videos, image, mainSlug }: { videos: { title: string, slug: string }[], image: string, mainSlug :string}) => {
  return (
    <>  
      <h1 className='py-3 px-5  text-xl transition-all duration-300 md:text-4xl selection:bg-blue-500'>Total Chapters ({videos.length})</h1>

              <div className="py-5 w-full">
        {
          videos.map((cur, i) => {
            return <NovelCard mainSlug={mainSlug} image={image} title={cur.title} slug={cur.slug}  key={i} index={i + 1} />
          })
        }
              </div>
    </>
  )
}

const NovelCard = ({ image, index, title, slug, mainSlug }: { image: string, index: number, title: string, slug: string, mainSlug :string})=>{
   
    return <>
      <Link href={`/novels/${mainSlug}/${slug}`} className="md:w-1/2  transition-all duration-300 hover:bg-gray-300   px-4 md:px-10 items-center border-b w-full flex py-3 justify-between">
       <div className="flex items-center gap-x-5">
          <h1 className='px-2'>{index}</h1>
          <div className="image w-20">
            <img src={image} alt="" className='w-1/2' />
          </div>
        <div className="text">
            <h1 className=' text-lg md:text-xl'>{title}</h1>
        </div>
       </div>
        <div className="icon">
          <FaRegCirclePlay className='text-xl  transition-all duration-300 md:text-2xl' />
        </div>
      </Link>
    </>
}

export default NovelList