import ErrorComponent from '@/components/ErrorComponent'
import Hero from '@/components/Home/Hero'
import { Loader } from '@/components/Loader'
import axios from 'axios'
import { cookies } from "next/headers"
import { revalidatePath } from 'next/cache'
// import NovelsComponents from 
const NovelsComponents = lazy(() => import('@/components/Home/Novels'))
import React, { Suspense, lazy } from 'react' 

const IndexPage = async () => { 

  
  revalidatePath('/') 

  // console.log(JSON.stringify(cookieData()));
  const cookieStore = cookies()
  
  const token =  await cookieStore.get('auth-token')?.value
    


  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/public`,{
    headers: {
      'Authorization': 'Bearer ' + token
    },
    cache:'no-store'
  })
  const data = await res.json();
  if(data.code ===404){
    return <ErrorComponent/>
  }
  return (
    <> 
      <Hero images={data.images} />
          <Suspense fallback={<Loader/>} > 
        <NovelsComponents novels={data.novels}  />
          </Suspense>
    </>
  )
}

export default IndexPage