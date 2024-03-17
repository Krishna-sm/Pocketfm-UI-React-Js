// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

// Define a service using a base URL and expected endpoints
export const ContactApi = createApi({
  reducerPath: 'ContactApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI }),
  endpoints: (builder) => ({
    AddContact: builder.mutation<string, {}>({
      query: (obj) => ({
        url:`/contact/`,
        body:obj,
        method:'POST'
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddContactMutation } = ContactApi