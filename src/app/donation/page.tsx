import React from 'react'

const DonationPage = () => {
  return (
    <>
                <div className="min-h-[50vh] w-full flex flex-col gap-y-10 md:gap-y-0 md:flex-row justify-center items-start">
                                {/* <img src='' /> */}
              <div className="w-full transition-all duration-300 md:w-1/2 min-h-[30vh] flex justify-center items-center flex-col select-none">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Qr-1.svg/220px-Qr-1.svg.png" alt="" className='p-2 border rounded-lg' />
                  <h1 className='text-2xl py-3 select-none'>Do Some Help </h1>
                  <h1 className='text-xl capitalize'>pay small amount for my hardwork </h1>
              </div>
              <div className="w-full text-xl transition-all duration-300 md:w-1/2 gap-y-2 flex   flex-col">
                <button className=' px-10 py-3 md:border rounded-md text-start md:text-center  clear-both text-2xl font-extralight '>All Channels</button>

                {
                    Array(1 ).fill(null).map((c,i)=>{
                            return <div className=' w-[96%] text-center py-14  mx-auto flex items-center  justify-center border' key={i}>
                               <div className="g-ytsubscribe" data-channel="GoogleDevelopers" data-layout="default" data-count="default" />

                            </div>
                    })
                }
              </div>
                </div>
    </>
  )
}

export default DonationPage