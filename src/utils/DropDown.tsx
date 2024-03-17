import React from 'react'
import { HiUserCircle } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
const DropDown = () => {
  return (
    <>

          <div className="hs-dropdown relative inline-flex [--trigger:hover]">
              <button id="hs-dropdown-hover-event" type="button" className="hs-dropdown-toggle  disabled:pointer-events-none  
                 
               dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ">
                  <HiUserCircle className='text-slate-400 bg-transparent text-4xl' />
           
              </button>
              <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 
                   after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" aria-labelledby="hs-dropdown-hover-event">
                    <p className='text-gray-600 text-lg' >Krishna</p> 
                  <button className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800   focus:outline-none  cursor-pointer " >
                      <IoLogOutOutline/>     Logout
                  </button>
         
              </div>
          </div>
    
    </>
  )
}

export default DropDown