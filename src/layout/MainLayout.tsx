"use client";
import FooterComponent from '@/components/Footer';
import HeaderComponent from '@/components/Header'
import {  LoadingComponent } from '@/components/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { localstorage_auth, private_route, public_route } from '../../constant';
import { removeUser, setUser, UserSelector } from '@/redux/slices/User.slice';
import { usePathname, useRouter } from 'next/navigation';

const MainLayout = ({children}:{children:React.ReactNode}) => {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const userData = useSelector(UserSelector)
  const router = useRouter()

const pathname = usePathname()
  const FetchUser = async (token: string) => {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/profile`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    const data = await response.data; 
    
    if(data){
      dispatch(setUser(data?.user));
    }
    
  }

    useEffect(()=>{
      const token = localStorage.getItem(localstorage_auth) || ''

      if (!token && private_route.some(route => pathname.startsWith(route))) {
        router.back();
        return;
      }

    },[
          pathname
    ])
 

  useEffect(() => {
    if (window.localStorage && localStorage.getItem(localstorage_auth) !== null) {
      const token = localStorage.getItem(localstorage_auth) || '';

      (async () => {
        await FetchUser(token);
      })()
    }
  }, [pathname])

  // const fechuse = async (e: MessageEvent) => {
  //   if (e.data.key === localstorage_auth && e.data.newValue) {
  //     const token = e.data.newValue;

  //     if (!userData) {
  //       try {
  //         await FetchUser(token);
  //       } catch (error) {
  //         console.error('Error fetching user:', error);
  //       }
  //     }
  //   } else {
  //     dispatch(removeUser({}));
  //   }
  // };

  const fechuse = async () => {
    const token = localStorage.getItem(localstorage_auth) ||'';

    if (token) {
      if (!userData) {
        try {
          await FetchUser(token);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    } else {
      dispatch(removeUser({}));
    }
  };


  useEffect(() => {
    const handleStorageChange = () => {
      fechuse();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  // useEffect(() => {
  //   const broadcastChannel = new BroadcastChannel('auth_channel');

  //   broadcastChannel.onmessage = fechuse;

  //   return () => {
  //     broadcastChannel.close();
  //   };
  // }, []);



      useEffect(()=>{

        const token = localStorage.getItem(localstorage_auth) || ''
        
        if(token){ 

          (async()=>{
           try {
             await FetchUser(token)
           } catch (error:any) {
                // localStorage.removeItem()
             console.log("remove request" + error.message)
           }finally{
             setLoading(false)
           }
          })()
        }else{
          setLoading(false)
        }
        
      }, [])


  if (loading) {
    return <LoadingComponent />
  }


  return (
        <>
        <HeaderComponent />
      <div className="min-h-[60vh]"> {children}</div>
          <FooterComponent/>
    </> 
  )
}

export default MainLayout