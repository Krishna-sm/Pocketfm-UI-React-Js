"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { localstorage_auth } from '../../../../../constant'
import { toast } from 'react-toastify'
import { useAddTokenMutation } from '@/redux/queries/SessionsNovel.query';
import { Loader } from '@/components/Loader';
import NoLoginComponent from '@/components/NoLoginComponent';

const LoginSuccessPage = ({params}:{params:{token:string}}) => {

    const router = useRouter()
  const [AddToken, AddTokenResponse] = useAddTokenMutation({})
    const saveData = async()=>{
      try {
        const res: any = await AddToken(params.token);
        if (res.error) {
          toast.error("Something went wrong")
          return
        }
        localStorage.setItem(localstorage_auth, params.token);
        window.close()
      } catch (error) {

      }
    

    }
    useEffect(()=>{

          if(params.token){
            saveData()
          }
    }, [params])
  if (AddTokenResponse.isLoading){
    return <Loader/>
  }

  return (
            <>

         <NoLoginComponent/>
    </>
  )
}

export default LoginSuccessPage