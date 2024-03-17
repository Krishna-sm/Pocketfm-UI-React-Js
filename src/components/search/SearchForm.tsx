"use client";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { toast } from 'react-toastify';

const SearchForm = ({ query }: { query :string}) => {
    // const data = useSearchParams()
    const router = useRouter()
    
    
  const [searchinput, setSearchInput] = useState(query || '');
            const onSubmitHandler =async(e:FormEvent<HTMLFormElement>)=>{
                e.preventDefault()
                            try {
                                            // axios.get("")
                                router.push(`/search?query=${searchinput}`)
                            } catch (error:any) {
                                        toast.error(error.message)
                            }
            }

  return (
    <>
          <form onSubmit={onSubmitHandler} className="w-full sticky top-0 flex  justify-between items-center bg-gray-700 text-white py-4 px-6  ">
              <input value={searchinput} onChange={(e)=>setSearchInput(e.target.value)} type="text" className='w-full   bg-transparent outline-none border-white focus:border-b transition-all duration-300  py-3 px-2' placeholder='Search Novel' />
              <button type='submit' ><IoSearchOutline className='text-2xl bg-transparent' /></button>

          </form>
    </>
  )
}

export default SearchForm