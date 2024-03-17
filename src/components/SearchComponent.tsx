import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const SearchComponent = () => {
  return (
    <>
          <form id='search' className="w-[50%] border  flex items-center px-3">
              <input  placeholder='Search Something' type="text" className="w-full py-2 px-4 border-none outline-none" />
              <IoSearchOutline className='text-2xl' />
          </form>
    </>
  )
}

export default SearchComponent