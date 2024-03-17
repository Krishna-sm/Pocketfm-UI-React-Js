// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { localstorage_auth } from '../../../constant'

// Define a service using a base URL and expected endpoints
export const AdminNovel = createApi({
  reducerPath: 'AdminNovel',

  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI }),
  tagTypes: ["getNovels", "getNovel", "novelVideos","getNovelById"],
  endpoints: (builder) => ({

    AddNovel: builder.mutation<string, {}>({
      query: (obj) => ({
        url: `/admin/novel/create`,
        body: obj,
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      invalidatesTags: ['getNovels']

    }),

    getAllNovels: builder.query<string, {}>({
      query: () => ({
        url: `/admin/novel/all-novels`,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      providesTags: ['getNovels']
    }),
    getNovelByIdAndDelete: builder.mutation<string, {}>({
      query: (id) => ({
        url: `/admin/novel/delete/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      invalidatesTags: ['getNovels']
    }),
    getNovelByIdAndToggle: builder.mutation<string, {}>({
      query: (id) => ({
        url: `/admin/novel/toggle/${id}`,
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      invalidatesTags: ['getNovels']
    }),

    getNovelById: builder.query<string, {}>({
      query: (id) => ({
        url: `/admin/novel/novels/${id}`,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      providesTags: ['getNovel']
    }),

    getNovelByIdAndUpdate: builder.mutation<string, {}>({
      query: ({ id, obj }: any) => ({
        url: `/admin/novel/update/${id}`,
        method: 'PATCH',
        body: obj,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      invalidatesTags: ['getNovels', 'getNovel']
    }),
    addNovelVideo: builder.mutation<string, {}>({
      query: (obj) => ({
        url: `/admin/video/create`,
        body: obj,
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      invalidatesTags: ['novelVideos']

    }),
    getAllNovelVideos: builder.query<{}, {}>({
      query: () => ({
        url: `/admin/video/all-videos`,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      providesTags: ['novelVideos']
    }),
    getNovelVideoById: builder.query<string, {}>({
      query: (id) => ({
        url: `/admin/video/get/${id}`,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      providesTags: ['getNovelById']
    }),
    getNovelVideoByIdAndUpdate: builder.mutation<string, {}>({
      query: ({id,obj}:any) => ({
        url: `/admin/video/update/${id}`,
        method: 'PUT',
        body:obj,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      invalidatesTags: ['getNovelById','novelVideos']
    }),
    getNovelVideoByIdAndDelete: builder.mutation<string, {}>({
      query: (id) => ({
        url: `/admin/video/delete/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      invalidatesTags: ['novelVideos']
    }),
    getNovelVideoByIdAndToggle: builder.mutation<string, {}>({
      query: (id) => ({
        url: `/admin/video/toggle/${id}`,
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(localstorage_auth)
        }
      }),
      invalidatesTags: ['novelVideos']
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddNovelMutation, useGetAllNovelsQuery, useGetNovelByIdAndDeleteMutation, useGetNovelByIdAndToggleMutation, useGetNovelByIdQuery, useGetNovelByIdAndUpdateMutation , useAddNovelVideoMutation , useGetAllNovelVideosQuery , useGetNovelVideoByIdQuery, useGetNovelVideoByIdAndUpdateMutation , useGetNovelVideoByIdAndDeleteMutation, useGetNovelVideoByIdAndToggleMutation } = AdminNovel