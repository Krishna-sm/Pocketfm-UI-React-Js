"use client";
import React from 'react'
import LoaderAnimation from '@/assets/animations/Animation - 1708239848934.gif'
import Image from 'next/image';
import Lottie from "lottie-react";
import groovyWalkAnimation from "@/assets/animations/loader.json";
export const LoadingComponent = () => {

    return (
        <>
            {/* <Image src={LoaderAnimation} width={1000} height={1000} alt='loader-animation' /> */}
                        <div className="min-h-screen flex w-full justify-center items-center">
                <Lottie className='w-[200px]' animationData={groovyWalkAnimation} loop={true} />
                        </div>
        </>
    )
}

export const Loader = () => {

    return (
        <>
            {/* <Image src={LoaderAnimation} width={1000} height={1000} alt='loader-animation' /> */}
            <div className=" py-5 flex w-full justify-center items-center">
                <Lottie className='w-[200px]' animationData={groovyWalkAnimation} loop={true} />
            </div>
        </>
    )
}
 