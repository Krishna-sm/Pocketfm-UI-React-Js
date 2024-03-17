"use client";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards, EffectCreative, Autoplay } from 'swiper/modules';
import { TestImage } from '../../../constant';
const SwiperSlider = ({ images }: { images: string[] }) => {
  return (
    <>
          <Swiper
              grabCursor={true}
              allowTouchMove={false}
              
              effect={'creative'}
              autoplay={
                  {
                      delay: 1500,
                      
                  }
              }
              loop
              creativeEffect={{
                  prev: {
                    opacity:0,
                      shadow: false,
                      translate: [0, 0, -400],
                  },
                  next: {
                      translate: ['100%', 0, 0],

                  },
              }}
              modules={[EffectCreative, Autoplay]}
              className="w-full"
          >
                            {
                  images.map((cur,i)=>{
                                    return <SwiperSlide key={i}>
                                        <img src={cur} className='w-full md:w-[50%] h-1/2' />
                                    </SwiperSlide>

                                })
                            }
          </Swiper>

    </>
  )
}

export default SwiperSlider