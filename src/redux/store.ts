import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserSlice } from "./slices/User.slice";
import { ContactApi } from "./queries/Contact.query";
import { AuthApi } from "./queries/Auth.query";
import { AdminNovel } from "./queries/AdminNovel.query";
import { LocationSlice } from "./slices/Location.slice";
import { SessionApi } from "./queries/SessionsNovel.query";
import { PublicNovelApi } from "./queries/PublicNovel.query";

export const store = configureStore({
        reducer:{
                [UserSlice.name]:UserSlice.reducer,
                [ContactApi.reducerPath]:ContactApi.reducer,
                [AuthApi.reducerPath]:AuthApi.reducer,
                [AdminNovel.reducerPath]:AdminNovel.reducer,
                [LocationSlice.name]: LocationSlice.reducer,
                [SessionApi.reducerPath]: SessionApi.reducer,
                [PublicNovelApi.reducerPath]: PublicNovelApi.reducer

        },
        middleware:(f)=>f().concat(
                ContactApi.middleware,
                AuthApi.middleware,
                AdminNovel.middleware,
                PublicNovelApi.middleware
                )
})

setupListeners(store.dispatch)