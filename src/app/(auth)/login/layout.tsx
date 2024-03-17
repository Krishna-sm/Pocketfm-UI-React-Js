import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "Login",
    description: "Login Pocket Novel ",
};

const AuthLayout = ({children}:{children:React.ReactNode})=>{
    return children
}

export default AuthLayout