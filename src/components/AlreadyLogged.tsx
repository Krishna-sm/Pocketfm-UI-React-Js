import Link from 'next/link'
import React from 'react'

const AlreadyLogged = () => {
  return (
      <div className=' w-[90%] mx-auto min-h-[40vh] md:w-1/2   border rounded-2xl select-none shadow-md flex justify-center items-center flex-col gap-y-5'>
          <h1 className='text-4xl font-semibold text-zinc-400 font-[PoppinsRegular] select-none '> Already Logged In </h1> 
          <Link href="/profile" className="px-6 py-2 border select-none  border-black rounded-lg transition-all duration-300 hover:border-none hover:bg-black hover:text-white ">Logout</Link>
          
    </div>
  )
}

export default AlreadyLogged