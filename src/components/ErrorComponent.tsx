import Image from 'next/image'
import React from 'react'
import ErrorImage from '@/assets/images/404.svg'

const ErrorComponent = () => {
  return (
    <>
          <div className=" w-full md:w-[90%] mx-auto hover:shadow-sm shadow-lg  transition-all duration-300 md:min-h-[20vh] min-h-screen my-10 flex justify-center items-center">

              <Image src={ErrorImage} alt='ErrorImage' width={500} height={500} />

          </div>

    </>
  )
}

export default ErrorComponent