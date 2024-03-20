
import React from 'react'
import GoBack from '../reuseable/GoBack'
const NovelHero = ({ title,image,desc }:{title:string,image:string,desc:string}) => {
  return (
    <>
        <section className="text-gray-600 body-font">
                    <GoBack/>
  <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center lg:items-start ">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10   flex  md:mb-0">
            <img className="object-cover object-center rounded mx-auto lg:mr-auto w-full md:w-1/2" alt="hero" src={image} />
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-[PoppinsRegular]  font-medium text-gray-900">{title}
      </h1>
            <p className="mb-8 leading-relaxed font-[PoppinsRegular]">{desc}</p>
    
    </div>
  </div>
</section>

    
    </>
  )
}

export default NovelHero