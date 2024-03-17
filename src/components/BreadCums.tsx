"use client";
import Link from 'next/link';
import React from 'react'

const BreadCumsComponent = ({link,pageName}:{link:string,pageName:string}) => {
  return (
    <>
                <div className="w-full transition-all duration-300 py-10 px-5 md:px-14 flex items-center justify-between ">
              <h1 className="text-lg select-none font-[PoppinsRegular] font-extralight md:text-3xl capitalize">{pageName}</h1>
        <ul className='flex gap-1  transition-all duration-300 cursor-pointer text-sm  md:text-lg'>
                        <li>
                      {/* Admin  */}
            <Link href={'/admin' } className='capitalize text-blue-800'>Admin</Link>

                        </li>
                        {/* { */}
                    {/* //   link &&  */}
                    <li>/</li>
                      <li>
                      <Link href={'/admin' +link} className='capitalize text-blue-800'>{pageName}</Link>
                      </li>
                        {/* } */}
                    </ul>
                </div>
    </>
  )
}

export default BreadCumsComponent