"use client";
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, {    MutableRefObject, useRef, useState } from 'react'
import * as yup from 'yup'
import { CiHeadphones } from "react-icons/ci";
import { toast } from 'sonner';
import ReCAPTCHA from "react-google-recaptcha";
import { ContactImage } from '../../../constant';
import { useAddContactMutation } from '@/redux/queries/Contact.query';
import { CgSpinner } from "react-icons/cg";
const ContactPage = () => { 
    const validationSchema = yup.object({
      name: yup.string().required("name is required"),
      email: yup.string().email("email must be required").required("email is required"),
      message: yup.string().required("message is required"),
      token: yup.string().required("token is required"),
    }) 

  const recaptcha = useRef<any>();
    const initialValues = {
        name:'',
        email:'',
        message:'',
        token:''
    }
    const [AddContact,AddContactResponse] = useAddContactMutation({}) 

    const onSubmitHandler = async(e:any,{resetForm}:any)=>{
            try {
                    // console.log(e);

              const { data,error}:any = await AddContact(e);
                      if(error){
                        toast.error(error.response.message);
                      }
              toast.success(data.msg) 
                            recaptcha.current?.reset() 
              resetForm()
              
            } catch (error:any) {
                        toast.error(error.message);
            }
    }
  return (
    <>      
    
                <section className="w-full py-10">
                    <div className="w-[90%] mx-auto shadow-md min-h-20 rounded-md flex flex-col md:flex-row gap-x-4">
                  <div className="w-full hidden md:flex  md:w-1/2">
            <img onContextMenu={() => false} src={ContactImage as string} alt='contact-image' className='rounded-2xl shadow-2xl object-cover' />
                  </div>
                  <div className="w-full md:w-1/2">
                            <div className="py-5 w-full flex justify-center items-center">
                          <CiHeadphones className='text-7xl p-4  border-black hover:bg-black hover:border-white cursor-pointer hover:text-white transition-all duration-300 shadow-xl rounded-full border-2 ' />
                            </div>
                      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
                            {({values,handleSubmit,setFieldValue})=>(
                        <form className='w-full md:px-4' onSubmit={handleSubmit}>
                  <div className="mb-3 px-2 ">
                    <label htmlFor="name">Name</label>
                    <Field name='name' id='name' type="text" placeholder='Enter Your Name' className="w-full border rounded-md outline-none py-2 px-4" />
                    <ErrorMessage component={'p'} name='name' className='text-sm text-red-600 capitalize' />
                  </div>
                  <div className="mb-3 px-2 ">
                    <label htmlFor="email">Email</label>
                    <Field id="email" name='email' type="text" placeholder='Enter Your Email ' className="w-full border rounded-md outline-none py-2 px-4" />
                    <ErrorMessage component={'p'} name='email' className='text-sm text-red-600 capitalize' />
                  </div>
                  <div className="mb-3 px-2 ">
                    <label htmlFor="message">Message</label>
                    <Field id='message' name='message' as="textarea" rows={5} placeholder='type Message...' className="w-full border rounded-md outline-none py-2 px-4" />
                    <ErrorMessage component={'p'} name='message' className='text-sm text-red-600 capitalize' />
                  </div>
                  <div className="mb-3 px-2 w-full flex justify-center">
                    <ReCAPTCHA ref={recaptcha} className={values.token ?'hidden':''} onChange={(token)=>{
                          setFieldValue('token',token)
                    }} sitekey={process.env.NEXT_PUBLIC_SITE_KEY as string} />
                  </div>
                  <div className="mb-3 px-2 ">
                    {values.token && <button disabled={AddContactResponse.isLoading} type='submit' className=' text-lg transition-all duration-300 inline-flex justify-center items-center   gap-x-4   border rounded-lg px-5 py-2 w-full text-center bg-[--selection-color] text-white'> Submit {AddContactResponse.isLoading? <><CgSpinner className="text-2xl text-white animate-spin" /></>:<></>} </button>}
                  </div>
                        </form>
                            )}
                      </Formik>
                  </div>
                    </div>
                </section>
    
    </>
  )
}

export default ContactPage