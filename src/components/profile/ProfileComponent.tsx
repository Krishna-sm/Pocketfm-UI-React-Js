"use client";
import { UserSelector, removeUser } from '@/redux/slices/User.slice';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { localstorage_auth } from '../../../constant';
import { Loader } from '@/components/Loader';
import { LocationSliceAddress } from '@/redux/slices/Location.slice';
const ProfileComponent = () => {

    const userData = useSelector(UserSelector)
    // const location = useSelector(LocationSliceAddress)
    const dispatch = useDispatch()
    // const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56787.6451122581!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974711240bf4ed1%3A0x3d12042cdb4ff20d!2sKM%20Enterprises!5e0!3m2!1sen!2sin!4v1710413329400!5m2!1sen!2sin`;
    const router = useRouter()
    const LogoutBtn = () => {
        try {
            localStorage.removeItem(localstorage_auth);
            dispatch(removeUser({}))
            router.push("/")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    if (!userData) {
        return <Loader />
    }

    return (
        <>
            <div className="min-h-[50vh] w-full py-10 px-4 flex flex-col gap-y-6"> 
                <div className="py-3 w-full flex justify-center items-center">
                    <FaUserCircle className='text-9xl font-thin' />
                </div>
                <div className="py-3 w-full flex justify-center items-center">
                    <h1 className='text-4xl font-[JostBlack] ' >Hey, <span className='capitalize font-[JostBlack] select-none'>{userData?.email?.split("@")[0]}</span> </h1>

                </div>

                <div className="w-full flex justify-center items-center">
                    <button onClick={LogoutBtn} className="px-6 py-2 border-2 border-black rounded-lg transition-all duration-300 hover:border-none hover:bg-black hover:text-white ">Logout</button>
                </div>
                        {/* <div className="w-1/2 mx-auto h-[60vh] shadow-xl rounded-2xl overflow-hidden">
                    <iframe
                        src={mapSrc}
                        width="600"
                        height="450"
                        className='w-full'
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Embedded Google Map"
                    ></iframe>
                        </div> */}


            </div>
        </>
    )
}

export default ProfileComponent