import { Loader } from '@/components/Loader';
import NoInputComponent from '@/components/NoInputComponent';
import SearchForm from '@/components/search/SearchForm';
import Link from 'next/link';
import React from 'react' 
import { LiaVideoSolid } from "react-icons/lia";
import { PiEyeLight } from "react-icons/pi";
import { SearchUrl } from '../../../constant';
import ErrorComponent from '@/components/ErrorComponent';
import { cookieData } from '../../../constant.service'; 
const Card = ({ slug, image, title }: { slug?: string, image:string, title:string })=>{
  return <Link prefetch href={`/novels/${slug}`} className='w-[97%] mx-auto  flex gap-x-3 items-start py-2   font-[PoppinsRegular] transition-all duration-300'>
    <img src={image}  className='w-[60px]'/>
    <div className="flex flex-col justify-between px-4 w-full">
      <h1 className="heading text-xl">{title}</h1>
        <div className="flex items-center gap-x-4">
        <p className="inline-flex items-center gap-x-1 text-zinc-500 text-sm"><LiaVideoSolid className='text-xl' /> <span>5</span></p>
        <p className="inline-flex items-center gap-x-1 text-zinc-500 text-sm"><PiEyeLight className='text-xl' /> <span>{(Math.random() * 20).toFixed(1)}k</span></p>
        </div>
    </div>
  </Link>
}


type dataProp= {
  msg?:string,
  novels?: { title: string, image: { uri: string }, slug :string}[],
  total?:number
}

const SearchPage = async({ searchParams }: { searchParams :{query:string}}) => {
  
 


  let data: dataProp ={} ;
        if(searchParams.query){
          const res = await fetch(SearchUrl(`/public/search?query=${searchParams.query}`),{
           cache:'no-store'
          })
          data = await res.json()
        }


  return (
    <>
                
      <SearchForm query={searchParams.query} />
 

      {!searchParams.query && <NoInputComponent />}

      {data && data.novels  &&  data.novels.length<=0 && <ErrorComponent/> }

 
          <div className=" gap-y-4 flex-row  ">
        {data.novels && data.novels.length > 0 && <ul className=' w-full px-4'>
          {
            data.novels.map((cur, i) => {
              return <Card slug={cur.slug} image={cur.image.uri} title={cur.title} key={i}  />
            })
          }
                            </ul>}
          </div>  

    </>
  )
}

export default SearchPage