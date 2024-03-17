"use client";
import React, { useEffect } from 'react'
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa"; 
const Videopage = () => {

    const scrolloEnd = () => {
        let container = document.getElementById("chat-list") as HTMLDivElement | null;
        container?.scrollTo({ top: container?.scrollHeight });
    };
    useEffect(()=>{
        scrolloEnd()

    },[])


           


  return (
    <section className='min-h-screen  w-full flex  flex-col md:flex-row items-start'>
          <div className=" w-full py-6 px-3  transition-all duration-300 md:w-[80%] md:min-h-screen   ">
            <div className="screen  shadow-md">
                  <iframe  src="https://www.youtube.com/embed/0JE5LrPBSb0" title="4K African Wildlife : The World's Greatest Migration from Tanzania to Kenya With Real Sounds" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='w-full rounded-md h-[50vh]  md:h-[480px]' allowFullScreen />

            </div>
          </div>
          <div className=" w-full py-6 px-3 transition-all duration-300 md:w-1/2 min-h-screen flex flex-col gap-y-5 ">
              <div id='video-list' className="h-[80vh] overflow-auto rounded border border-black  bg-transparent px-5">
                                        {
                                            Array(10).fill(null).map((cur,i)=>{
                                                return <Card key={i} />
                                            })
                                        }    
              </div>    
              <div className="h-[80vh] overflow-hidden rounded border border-black  relative">
                  <div className="h-[80%] w-full mb-40 overflow-auto transition-all duration-300" id='chat-list'>
                                                    {
                                                        Array(20).fill(null).map((cur,i)=>{
                                                            return <ChatCard key={i} id={i+1} />
                                                        })
                                                    }
                  </div>

                                                    <ChatForm/>
              </div>    
          </div>
    </section>
  )
}


const Card = ()=>{
    return <>
    
        <div className="card cursor-pointer w-full transition-all duration-300 flex items-center rounded border py-3 px-2 my-2 ">
            <img src="https://picsum.photos/400/400" className='w-[100px] rounded-full object-contain px-3 py-2 ' alt="" />
            <div className="flex flex-col items-start px-3">
                <h1 className="text-xl font-regular">Lorem ipsum dolor sit.</h1>
                <p className="text-sm text-zinc-500 font-thin text-ellipsis text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <FaRegCirclePlay className='text-4xl cursor-pointer' />
        </div>
    </>
}


const ChatForm= ()=>{
    return <>
    
        <form className="chat-box w-full flex items-center absolute bottom-0 bg-gray-800 py-3 ">
            <input type="text" className="w-full border py-4 rounded-full px-4 border-none outline-none " placeholder='Enter something...' />
            <button className='  p-3 rounded-full text-center '>
                <IoMdSend className='text-2xl bg-transparent text-white ' />
            </button>
        </form>
    </>
}


const ChatCard = ({id}:any)=>{
    return <>
        <div className="card flex items-center w-full px-5 py-4 border-b  ">
            <div className="w-[100px]">
                <img src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" className="w-[100px] rounded-full " alt="" />
            </div>
            <div className="flex w-full flex-col items-start justify-start bg-transparent">
                <p className='text-xs text-zinc-400' >@user123344----{id}</p>
                <p className='text-sm text-gray-800' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti vel, iusto consectetur, sunt, architecto incidunt consequuntur labore rem esse exercitationem laborum quos hic?</p>
            </div>
        </div>
    </>
}

export default Videopage