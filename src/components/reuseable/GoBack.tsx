"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { IoIosArrowRoundBack } from "react-icons/io";
const GoBack = () => {

  const router = useRouter()
  return (
    <>
      <button onClick={() => router.back()} className=  ' text-xl md:text-2xl border bg-transparent transition-all duration-300 hover:bg-black p-2 md:p-3 rounded-full mx-10'><IoIosArrowRoundBack className='hover:text-white bg-transparent' /></button>
    </>
  )
}

export default GoBack