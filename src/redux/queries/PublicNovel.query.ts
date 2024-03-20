// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { localstorage_auth } from '../../../constant'

// Define a service using a base URL and expected endpoints
export const PublicNovelApi = createApi({
    reducerPath: 'PublicNovelApi',
    tagTypes:["getNovelBySlugAndVideoSlug"],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI }),
    endpoints: (builder) => ({
        getPublicNovelBySlugWithVideoSlug: builder.query < string, { slug:string, videoSlug:string }>({
            query: (obj) => ({
                url: `/public/novel/${obj.slug}/${obj.videoSlug}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
                }
            })
        }),
        addVideochat: builder.mutation<string, { slug: string, videoSlug: string,comment:string }>({
            query: (obj) => ({
                url: `/public/novel/${obj.slug}/${obj.videoSlug}/comment`,
                method: 'POST',
                body:{comment:obj.comment},
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
                }
            }),
            invalidatesTags: ['getNovelBySlugAndVideoSlug']
        }),

        getVideoChat: builder.query<string, { slug: string, videoSlug: string }>({
            query: (obj) => ({
                url: `/public/novel/${obj.slug}/${obj.videoSlug}/comment`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
                }
            }),
            providesTags: ['getNovelBySlugAndVideoSlug']
        }),

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useGetPublicNovelBySlugWithVideoSlugQuery ,  useAddVideochatMutation, useGetVideoChatQuery } = PublicNovelApi