"use client";
import React from 'react'
import LoginSvg from '@/assets/images/login.svg'
import Image from 'next/image';
import Link from 'next/link';
const NoLoginComponent = () => {
    
  return (
    <>
                    <div className="w-[90%] md:w-[70%] shadow-md min-h-[60vh] mx-auto py-5 px-10 my-10  flex-col md:flex-row flex  justify-center  md:justify-between items-center">
              <Image width={1000} height={1000} src={LoginSvg.src} className='w-[70%] lg:w-1/2' alt="image" />
        <div className=" w-full justify-start  py-4 transition-all duration-300  md:py-10 mx-auto">
                <h1 className=' text-3xl lg:text-7xl font-bold text-zinc-300 text-center select-none'>login please !</h1>
                <div className="py-2 transition-all duration-300 md:py-10 flex justify-center w-full">
                  <Link href={'/login'} className="px-10  py-2 border rounded-lg hover:bg-black hover:border-none outline-none hover:text-white transition-all duration-300">
                  login
                  </Link>
                </div>
              </div>
                        </div>   
    </>
  )
}

export default NoLoginComponent