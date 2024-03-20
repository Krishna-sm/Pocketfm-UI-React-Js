"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'  
import { IoSearchOutline } from 'react-icons/io5' 
import { CiLogin } from "react-icons/ci";
import DropDown from '@/utils/DropDown';
import { useSelector } from 'react-redux';
import { UserSelector } from '@/redux/slices/User.slice';
import { HiUserCircle } from 'react-icons/hi2';
import { IoIosMenu } from "react-icons/io";
import { useSidebarContext } from '@/context/Sidebar';
const HeaderComponent = () => { 
    const UserData = useSelector(UserSelector)
  const {  isOpen, setIsOpen }:any = useSidebarContext()
  const pathname = usePathname()

  return (
    <>
      <header className={`py-4 w-full shadow-sm ${pathname.startsWith('/admin') && 'shadow-md'} mb-3`}>
                                    <nav className="w-[92%] md:w-[90%] mx-auto flex justify-between items-center">
                                        <Link href={'/'} className='  text-xl font-normal select-none'>@theDevilst</Link>
          <Link href={'/search'} id='search' className={`w-[50%] border max-[527px]:hidden flex justify-between py-2 items-center px-3 rounded-lg overflow-hidden ${pathname.startsWith("/search") || pathname.startsWith( '/admin' )?'hidden':''} `}>
            <span className='text-zinc-500 select-none'>Search Something</span>
          </Link>
                                        <div className="btns flex items-center gap-x-4">

            <Link href={'/search'}> <IoSearchOutline className='text-2xl min-[527px]:hidden ' /></Link>
            {UserData?.user_type ==='admin_user' &&
                  <>
                  
              <button className='md:hidden' onClick={() => setIsOpen(!isOpen)} ><IoIosMenu className='text-2xl' /></button>
              <Link href={'/admin'} className=''>
                <span className="underline text-lg capitalize">Admin</span>
              </Link>

                  </>
              }

            {UserData ?
              <Link href={'/profile'} className=''>
                <HiUserCircle className='text-slate-800 bg-transparent text-4xl' /> 
              </Link>
            // <DropDown />
             : <Link href={'/login'} className='px-5 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-all duration-200 inline-flex items-center'><span className="hidden md:block">Login</span> <CiLogin className="text-2xl" /> </Link>
}
                

                                        </div>
                                    </nav>
                        </header>
    </>
  )
}

export default HeaderComponent