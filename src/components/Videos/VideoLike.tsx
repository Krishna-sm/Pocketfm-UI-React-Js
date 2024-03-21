"use client";
import { useAddVideoLikeMutation } from '@/redux/queries/PublicNovel.query';
import { useParams } from 'next/navigation';
import React from 'react'
import Heart from 'react-animated-heart'
import { toast } from 'sonner';
import {CgSpinner} from 'react-icons/cg'
import { useSelector } from 'react-redux';
import { UserSelector } from '@/redux/slices/User.slice';

const VideoLike = ({ isLike = false }: { isLike :boolean}) => {
  const { slug, videoSlug }: { slug:string, videoSlug:string } = useParams();
  const [ AddVideoLike,AddVideoLikeResponse ] = useAddVideoLikeMutation()
  const userData = useSelector(UserSelector)
            const onSubmitHandler = async()=>{
              if (!userData){
                return
              }
                        try {   
                          
             const { data, error }: any = await AddVideoLike({ slug: slug, videoSlug: videoSlug })

                          if (error) {
                            toast.error(error.data.message);
                            return
                          }
                          toast.success(data.msg);

                        } catch (error:any) {
                                toast.error(error.message);
                        }
            }

  return (
    <>
      {AddVideoLikeResponse.isLoading ? <CgSpinner className='text-xl animate-spin ' /> : <Heart  isClick={isLike} onClick={onSubmitHandler} />}
    </>
  )
}

export default VideoLike