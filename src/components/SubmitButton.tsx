import React from 'react'
import { CgSpinner } from "react-icons/cg";

type props= {
    className?:string,
    isLoading?:boolean,
    children:React.ReactNode,
    type?:'submit'| 'reset'
}

const SubmitButton = ({ children,className,isLoading,type}: props) => {
  return (
    <>
          <button disabled={isLoading} className={isLoading ? className+" flex disabled:bg-blue-300 justify-center items-center ":className} type={type ? type : 'submit'}>{isLoading ? <CgSpinner className='animate-spin text-2xl text-white ' /> : children}</button>
    </>
  )
}

export default SubmitButton