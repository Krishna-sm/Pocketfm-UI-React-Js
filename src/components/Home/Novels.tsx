"use client";
import React, { useState }  from 'react'
import { TestImage } from '../../../constant'
import Marquee from "react-fast-marquee";
import { IoIosShareAlt } from "react-icons/io";
// Import css files 
import { Loader } from '../Loader';
import Link from 'next/link';

const NovelCard = ({ data }: { data: { image: string, slug: string, title: string }})=>{

            const [isHide,setIsHide] = useState(false);

    return <>
        <div onMouseEnter={() => setIsHide(true)} onMouseLeave={() => setIsHide(false)} className="lg:w-full p-2  relative ">
            <div className="block relative h-[40vh] rounded overflow-hidden ">
          <img alt="ecommerce" className="object-cover object-center w-full h-[100%]   block" src={data.image} />
                <div className={`absolute w-full transition-all duration-300 h-[20vh]   bg-white  bottom-0 rounded-tr-2xl   rounded-tl-2xl px-3 py-4 ${isHide ? 'translate-y-0' : 'translate-y-[100%]'}`}>
                    <h1 className='text-center  text-sm lg:text-lg ' >{data.title}</h1>
                        <div className="w-full py-4">
              <Link href={`/novels/${data.slug}`} className='px-2  py-1 flex justify-center items-center rounded-full border-2 bg-[--selection-color]  transition-all duration-300'>
                <IoIosShareAlt className='text-3xl  text-white' />
              </Link>
                        </div>
                 
                </div>
            </div>

         
        </div>
    </>
}

const NovelsComponents = ({ novels }: { novels: { image: string, slug: string, title: string }[] }) => {
  

  return (
    <>

          <section className="text-gray-600 body-font w-full lg:w-[90%] mx-auto">
  <div className="container px-5 py-5 mx-auto">
    <div className="flex flex-wrap -m-4">
                     
            <Marquee className={'gap-x-2   '} pauseOnHover autoFill={novels.length>=10} key={new Date().getTime()} 
                    //   @ts-ignore
                      velocity={40} minScale={0.7}  >
              {/* {novels.length > 0 && novels.map(({ _cur, i }: { _cur: { image: string, slug: string, title: string }, i: number }) => (

                              <NovelCard data={_cur} key={i} />
                          ))} */}
                          {
                            novels.length>0 && novels.map((cur,i)=>{
                              return <NovelCard data={cur} key={i} />
                            })
                          }
                      </Marquee>

                     
    </div>
  </div>
</section>


    </>
  )
}

export default NovelsComponents