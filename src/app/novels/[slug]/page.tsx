import NovelHero from '@/components/search/NovelHero'
import NovelList from '@/components/search/NovelList'
import React from 'react'
import { SearchUrl } from '../../../../constant'
import GoBack from '@/components/reuseable/GoBack'
import ErrorComponent from '@/components/ErrorComponent'
import { cookies } from 'next/headers'

const NovelPage = async({ params }:{params:{slug:string}}) => {

  const cookiesData = cookies()
  const token = await cookiesData.get('auth-token')?.value

  const res = await fetch(SearchUrl(`/public/novel/${params.slug}`),{
    headers: {
      'Authorization': 'Bearer ' + token
    },
   cache:'no-store'
  })

  const data = await res.json()

  if(data.code === 400){
    return<>
      <GoBack />
      <ErrorComponent/>
    </>
  }

  return (
    <>

      {/* {JSON.stringify(data)} */}
      <NovelHero  desc={data.novel.desc} image={data.novel.image.uri} title={data.novel.title} />
      <NovelList mainSlug={params.slug} videos={data.videos} image={data.novel.image.uri} />
    </>
  )
}

export default NovelPage