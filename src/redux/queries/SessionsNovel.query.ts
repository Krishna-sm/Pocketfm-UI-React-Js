// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const SessionApi = createApi({
    reducerPath: 'SessionApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        AddToken: builder.mutation<string, {}>({
            query: (token) => ({
                url: `/session-route`,
                body: { token },
                method: 'POST'
            })
        }),
        RemoveToken: builder.mutation<string, {}>({
            query: (token) => ({
                url: `/session-route`,
                method: 'DELETE'
            })
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddTokenMutation, useRemoveTokenMutation } = SessionApi