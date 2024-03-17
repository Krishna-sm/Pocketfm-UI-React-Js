"use client";
import React, { useEffect, useState } from 'react'  
import { ChatCard, ChatForm } from '@/components/Videos/Chats';
import { Card } from '@/app/videos/VideoData';
import { AiOutlineLike, AiFillLike, AiOutlineDislike ,AiFillDislike} from "react-icons/ai"; 
import { useGetPublicNovelBySlugWithVideoSlugQuery, useGetVideoChatQuery } from '@/redux/queries/PublicNovel.query';
import ErrorComponent from '@/components/ErrorComponent';
import { Loader } from '@/components/Loader';
import ListImage from '@/assets/images/list.svg'
import YouTube, { YouTubeProps } from 'react-youtube';
const Videopage = ({ params }: { params: { videoSlug: string, slug :string}}) => {   

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',

        playerVars: {
            // Controls to be shown in the player
            controls: 1, // Show controls
            fs: 1, // Enable fullscreen button
            modestbranding: 1, // Prevent YouTube logo in control bar
            rel: 0, // Don't show related videos at the end
            autoplay: 0, // Don't autoplay
            disablekb: 0, // Enable keyboard controls
            showinfo: 0, // Don't show video title and uploader before video starts
        },
    };



    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const {  isError,isLoading,data }:any = useGetPublicNovelBySlugWithVideoSlugQuery({ slug: params.slug, videoSlug: params.videoSlug })

    const Chatresponse:any = useGetVideoChatQuery({ slug: params.slug, videoSlug: params.videoSlug })
    const [status,setStatus] = useState('');
 

    

    const scrolloEnd = () => {
        let container = document.getElementById("chat-list") as HTMLDivElement | null;
        container?.scrollTo({ top: container?.scrollHeight });
    };
    useEffect(() => {
        scrolloEnd()

    }, [Chatresponse.data])

    if (isError) {
        return <ErrorComponent />
    }

    if (isLoading){
        return <Loader/>
    }

    const onClickLike = (v:string)=>setStatus(v)

    return (
        <section className='min-h-screen  w-full flex  flex-col md:flex-row items-start'>
            {/* {JSON.stringify(data)} */}
            <div className=" w-full py-6 px-3  transition-all duration-300 md:w-[80%] md:min-h-screen   ">
                <div className="screen  shadow-md">
                    {/* <iframe src={`https://www.youtube.com/embed/${data.video.video_id }`} title={data.video.title} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='w-full rounded-md h-[50vh]  md:h-[480px]' allowFullScreen /> */}

                    <YouTube videoId={data.video.video_id} opts={opts} onReady={onPlayerReady} iframeClassName='w-full rounded-md h-[50vh]  md:h-[480px]' />

                </div>
                    <div  id="content" className="px-3 my-5 py-6 flex flex-col gap-y-5 max-h-[50vh] md:h-[80vh] overflow-auto relative">
                    <div className="flex justify-between py-2 px-2">  <h1 className="text-2xl ">{params.videoSlug}</h1>
                                <div className="flex items-center gap-x-4">
                            <span> {status !== 'like' ? <AiOutlineLike onClick={() => onClickLike('like')} className='text-xl md:text-3xl' /> : <AiFillLike onClick={() => onClickLike('like')} className='text-xl md:text-3xl text-[--selection-color]' />}10</span> 
                            <span> {status !== 'dislike' ? <AiOutlineDislike onClick={() => onClickLike('dislike')} className='text-xl md:text-3xl' /> : <AiFillDislike onClick={() => onClickLike('dislike')} className='text-xl md:text-3xl text-[--selection-color]' />}10</span> 
                                </div>
                    </div>
                    <p className=' selection:bg-indigo-500' dangerouslySetInnerHTML={{ __html: data.video?.desc }} /> 
                    </div>
            </div>
            <div className=" w-full py-6 px-3 transition-all duration-300 md:w-1/2 min-h-screen flex flex-col gap-y-5 ">
                <div id='video-list' className={` h-[60vh] lg:h-[80vh] ${data.Othervideo.length===0 && 'flex justify-center  items-center'} overflow-auto rounded border border-black  bg-transparent px-5`}>

                                {
                        data && data.Othervideo && data.Othervideo.length<1  &&<>

                        <img src={ListImage.src} alt="empty-list" className='w-1/2' />
                        </>
                                }
                    {
                        data && data.Othervideo && data.Othervideo.map((cur:any, i:number) => {
                            return <Card data={cur} image={data.novel.image.uri} key={i} />
                        })
                    }
                </div>
                <div className="h-[80vh] overflow-hidden rounded border border-black  relative">
                    <div className={`h-[80%] w-full ${Chatresponse && Chatresponse.data && Chatresponse.data.length === 0 && 'flex justify-center  items-center'} mb-40 overflow-auto transition-all duration-300`} id='chat-list'>

                        {Chatresponse && Chatresponse.data && Chatresponse.data.length<1 ?
                        <>
                                <img src={ListImage.src} alt="empty-list" className='w-1/3 py-5' />

                        </>:  
                            // JSON.stringify(Chatresponse.data.map((c)=>c))
                            Chatresponse && Chatresponse.data && Chatresponse.data.length > 0 && Chatresponse.data.map((cur: { user: { name: string }, comment: string, createdAt :string}, i:number) => {
                                return <ChatCard key={i} date={cur.createdAt} username={cur.user.name} comment={cur.comment} id={i + 1} />
                            })

                    }

                        {

                            // JSON.stringify(Chatresponse.data)
                            // Array(20).fill(null).map((cur, i) => {
                            //     return <ChatCard key={i} id={i + 1} />
                            // })
                        }
                    </div>

                    <ChatForm />
                </div>
            </div>
        </section>
    )
}





export default Videopage