// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<string, {}>({
      query: (obj) => ({
        url:`/auth/signup`,
        body:obj,
        method:'POST'
      })
    }),
    verifyOtp: builder.mutation<string, {otp:string,token:string}>({
      query: (obj) => ({
        url:`/auth/verify`,
        body:{otp:obj.otp},
        method:'POST',
        headers:{
          'x-token':obj.token
        }
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation , useVerifyOtpMutation } = AuthApi