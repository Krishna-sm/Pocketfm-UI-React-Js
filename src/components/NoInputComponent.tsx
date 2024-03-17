import React from 'react'
import SearchImage from '@/assets/images/search.svg';
import Image from 'next/image';
const NoInputComponent = () => {
  return (
    <>  
                    <div className="w-[90%] mx-auto  md:w-1/2 min-h-[50vh] my-10 flex flex-col gap-y-4 rounded-2xl py-10 items-center justify-center">
                                    <div className={' w-full flex items-center   justify-center mx-auto' }>
                  <Image src={SearchImage} className=' w-[40%] md:w-[30%] mr-10' alt='search-image' width={200} height={200} />
                                    </div>
              <h1 className="text-center  lg:text-4xl text-2xl  font-[PoppinsRegular]">Search Novel</h1>
            
                    </div>
    </>
  )
}

export default NoInputComponent