"use client";
import React, { useState } from 'react'
import { FcGoogle ,FcScatterPlot} from "react-icons/fc";
import InstagrmSvg from '@/assets/images/instagram.svg'
import Image from 'next/image';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {  toast } from 'react-toastify';
import { CgSpinner } from "react-icons/cg";
import * as yup from 'yup'
import { useRouter } from 'next/navigation';
import { useLoginUserMutation,useVerifyOtpMutation } from '@/redux/queries/Auth.query';
import { localstorage_auth } from '../../../../constant';
import { useAddTokenMutation } from '@/redux/queries/SessionsNovel.query';
import { UserSelector } from '@/redux/slices/User.slice';
import { useSelector } from 'react-redux';
import AlreadyLogged from '@/components/AlreadyLogged';

const Login = () => {
  const router = useRouter();
  const UserData = useSelector(UserSelector)

  const [isEmailSend,setIsEmailSend] = useState(false);
const [msg,setMsg] = useState<{type:'error' | 'success' | string,msg:string}>({
  type:'',
  msg:''
})
  const validationSchema = yup.object({
    email: yup.string().email("Enter Valid Email Address").required("Enter  Email Address").lowercase()
  })
  const validationSchema2 = yup.object({
    otp: yup.string().length(6).required("Enter  valid OTP")
  })

  const [LoginUser,LoginUserResponse]  = useLoginUserMutation({})
  const [VerifyOTP,VerifyOTPResponse]  = useVerifyOtpMutation({})
  const [AddToken,AddTokenResponse] = useAddTokenMutation({})

  if (UserData){
    router.push("/")
    return <AlreadyLogged/>
  }

  const onSubmitHandler  = async(e:{email:string},{resetForm}:any,isReset=true)=>{
    try {

      const {data,error}:any = await LoginUser(e);

      if(error){
        setMsg({
          type: 'error',
          msg: error.data.message
        })
        toast.error(error.data.message);
        return
      }

      localStorage.setItem('v-token', data.token)
      localStorage.setItem('email', e.email)
      toast.success(data.msg)
      setMsg({
        type: 'success',
        msg: data.msg+" "+data.otp
      })
      if(isReset){

        resetForm()
        setIsEmailSend(true);
      }
    } catch (error:any) {
            toast.error(error?.message)
    }
  }

  const resendOTP = async()=>{
   const email =  localStorage.getItem('email') || ''
   if(!email){
    toast.error("Please login Again")
    return
   }
   await onSubmitHandler({email},{},false);
  }

  const onOTPSubmitHandler = async (e: { otp: string }, {resetForm}: any) => {
    try {
      
      const token = localStorage.getItem('v-token') || ''
      const { data, error }: any = await VerifyOTP({ otp: e.otp, token: token });
      setMsg({
        type: '',
        msg:''
      })
      if(error){
        toast.error(error.data.message);
        return
      }
  
      toast.success(data.msg)
      // toast.success("otp verified")
          try {
            const res:any = await AddToken(data.token);
            if (res.error){
                  toast.error("Something went wrong")
              return
            }
          } catch (error) {
            
          }

      localStorage.setItem(localstorage_auth, data.token)
      localStorage.removeItem('v-token')
      localStorage.removeItem('email') 

      // setIsEmailSend(false);
      resetForm()
      router.back()
    } catch (error: any) {
      toast.error(error?.message)
    }
  }


  const onClickGoogleLogin = ()=>{
    // Specify the properties of the popup window
    const popupWidth = 600;
    const popupHeight = 800;
    const popupOptions = `width=${popupWidth},height=${popupHeight},left=${(window.innerWidth - popupWidth) / 2},top=${(window.innerHeight - popupHeight) / 2},resizable=yes,scrollbars=yes`;
    window.open(process.env.NEXT_PUBLIC_BACKEND_URI + "/auth/google", 'popup', popupOptions)
  }


  return (
    <>    

            <div className=" w-full transition-all duration-300 md:w-1/2 mx-auto shadow-md p-10 rounded-sm">
                <div className="flex flex-col gap-y-3 w-full lg:w-1/2 mx-auto">
          <button onClick={onClickGoogleLogin}  className=' text-lg transition-all duration-300 inline-flex gap-x-4 items-center border rounded-lg px-5 py-3'> <FcGoogle className='text-2xl' />    login with google</button>
              <div className="flex items-center">
            <hr className='w-full' /> <span className='text-nowrap px-2'>Or Email</span><hr  className='w-full'/>
              </div>

          {msg.msg && <div className={` px-3  transition-all duration-300 py-2 ${msg.type === 'error' ? 'bg-red-100 text-red-700' :'bg-green-100 text-green-700'} shadow-md select-none  rounded-md`}>
                      {msg.msg}
                    </div>}
            <Formik validationSchema={validationSchema} onSubmit={onSubmitHandler} initialValues={{ email: '' }} >
                 {!isEmailSend ?<>
              <Form>
                <div className="mb-3">
                  <label htmlFor="email">Enter Email</label>
                  <Field  id="email" name="email" placeholder="username@example.com" type="text" className=' text-sm transition-all duration-300 inline-flex gap-x-4 items-center border rounded-lg px-5 py-3 w-full  outline-none' />
                  <ErrorMessage name='email' component={'p'} className='text-sm text-red-500' />
                </div>
                <div className="mb-3">
                  <button disabled={LoginUserResponse.isLoading} className=' text-lg transition-all duration-300   gap-x-4  border rounded-lg px-5 py-2 inline-flex items-center w-full text-center bg-[--selection-color] text-white justify-center'> {LoginUserResponse.isLoading ? <>
                      <span>loading... </span>
                   <CgSpinner className="text-2xl text-white animate-spin" />
                  </> : 'Login'}</button>
                </div>
              </Form>
           
                  </>:
                  <>
              <Formik validationSchema={validationSchema2} onSubmit={onOTPSubmitHandler} initialValues={{ otp: '' }} >
              <Form>
                <div className="mb-3">
                  <label htmlFor="otp">Enter OTP</label>
                      <Field onInput={(e:any) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6)} autoComplete="off" id="otp" name="otp" placeholder="XXXXXX" type="text" className=' text-sm transition-all duration-300 inline-flex gap-x-4 items-center border rounded-lg px-5 py-3 w-full  outline-none' />
                    <ErrorMessage name='otp' component={'p'} className='text-sm text-red-500' />
                </div>
                    <div onClick={resendOTP} className="mb-3 text-sm underline cursor-pointer text-right text-indigo-500"> 
                        Resend OTP
                    </div>

                <div className="mb-3">
                      <button disabled={VerifyOTPResponse.isLoading} className=' text-lg transition-all duration-300   gap-x-4 items-center border rounded-lg px-5 py-2 w-full text-center bg-[--selection-color] justify-center text-white flex '> {VerifyOTPResponse.isLoading ? <>
                        <span>loading... </span>
                        <CgSpinner className="text-2xl text-white animate-spin" />
                      </> : 'Submit'}</button>
                </div>
              </Form>
            </Formik>
                  </>}
          </Formik>
                </div>
            </div>
    </>
  )
}

export default Login