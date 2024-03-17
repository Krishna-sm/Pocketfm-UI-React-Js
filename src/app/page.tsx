import ErrorComponent from '@/components/ErrorComponent'
import Hero from '@/components/Home/Hero'
import { Loader } from '@/components/Loader'
import axios from 'axios'
// import NovelsComponents from 
const NovelsComponents = lazy(() => import('@/components/Home/Novels'))
import React, { Suspense, lazy } from 'react' 

const IndexPage = async () => { 

  



  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/public`,{
    next:{
      "revalidate":3600
    }
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