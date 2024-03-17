import { GoBack } from '@/utils/BackFunctions'
import React from 'react'
import ErrorImage from '@/assets/images/404.svg'
import Image from 'next/image'

const ErrorPage = () => {


  


  return (
    <>
    <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
  <div className="rounded-lg w-1/2 mx-auto py-10 bg-white p-8 text-center ">
          <div className="mx-auto">
            <Image src={ErrorImage} alt='error-image' width={1000} height={1000} />
          </div>
    <h1 className="mb-4 text-4xl font-bold">404</h1>
    <p className="text-gray-600">Oops! The page you are looking for could not be found.</p>
            {/* @ts-ignore */}
          <GoBack ifBack href="/" className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> Go back to Home </GoBack>
  </div>
</div>

    
    </>
  )
}

export default ErrorPage