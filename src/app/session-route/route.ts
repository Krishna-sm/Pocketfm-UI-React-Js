import { NextRequest, NextResponse } from "next/server"

export const POST=async(request:NextRequest)=>{
    const data = await request.json();
    const response = NextResponse.json({})
    response.cookies.set("auth-token",data.token)
    return response
}


export const DELETE = async (request: NextRequest) => {
    const response = NextResponse.json({})
    response.cookies.delete("auth-token")
    return response
}