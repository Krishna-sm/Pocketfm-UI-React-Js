'use client';
import Link from 'next/link';
import {   usePathname } from 'next/navigation';
import React, { Suspense, useEffect } from 'react'
import { CiInstagram } from "react-icons/ci";
import { FaFacebook, FaTwitter } from "react-icons/fa"; 
import { MdOutlineLocalPhone } from "react-icons/md";
import { BsQrCode } from "react-icons/bs";
const FooterComponent = () => {


  const pathame = usePathname()

  // useEffect(()=>{
  
  // },[pathame])

  if (pathame.startsWith("/admin")) {
    return <>
    </>
  }
  return (
    <>
                            <div className="border-t flex w-full justify-between flex-col items-center py-4 px-5">
                             
                                <p>@copyright <Suspense fallback={null}>{new Date().getFullYear()}</Suspense> </p>
              <div className="flex gap-x-2 items-center   py-3 text-2xl ">

                  <CiInstagram  className='cursor-pointer' />
                  <FaFacebook  className='cursor-pointer' />
                  <FaTwitter  className='cursor-pointer' />
              </div>
      <div className="flex justify-center lg:justify-end items-center w-full gap-x-4">

          {pathame !== '/contact' && <div className="flex ">
            <Link href={'/contact'} className='underline inline-flex items-center gap-x-3 '>   <span><MdOutlineLocalPhone className='p-1 md:p-2  text-xl md:text-4xl bg-black text-white rounded-full' />  </span> Contact</Link>
          </div>}
          {pathame !== '/donation' && <div className="flex ">
            <Link href={'/donation'} className='underline inline-flex items-center gap-x-3 '>   <span className=' '><BsQrCode className=' text-xl   md:text-4xl bg-black text-white ' />  </span> Dontation</Link>
          </div>}
      </div>
                            </div>
    </>
  )
}

export default FooterComponent