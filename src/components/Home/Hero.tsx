import Link from 'next/link'
import React from 'react'
import SwiperSlider from './Swiper'

const Hero = ({ images }: { images :string[]}) => {
  return (
    <>
          <section className="text-gray-600 body-font my-3 w-full lg:w-[90%] mx-auto">
  <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col-reverse items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-[PoppinsRegular]  font-medium text-gray-900">
        Listen Your Favouraite Novel
    
      </h1>
            <p className="mb-8 leading-relaxed">Escape reality with our audio novels. Each word a whisper, each chapter a journey. From romance to mystery, let your ears be your guide. Dive in, press play, and let the stories sweep you away</p>
      <div className="flex justify-center">
              <Link href={'/search'} className="inline-flex text-white bg-[--selection-color] border-0 py-2 px-3 focus:outline-none hover:bg-[--selection-color] rounded ">Start Listening </Link>
        
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-1/2 py-4 md:py-0">
            {/* <img className="object-cover object-center rounded" alt="hero" src="https://images.unsplash.com/photo-1485579149621-3123dd979885 " /> */}
            <SwiperSlider images={images} />
    </div>
  </div>
</section>

    </>
  )
}

export default Hero