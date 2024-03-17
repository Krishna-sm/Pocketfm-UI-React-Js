import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
        name:"UserSlice",
    initialState:{
            user:null
    },
    reducers:{
                
        setUser:(state,action)=>{
                state.user = action.payload
        }
        ,
        removeUser:(state,action)=>{
                state.user = null
        }
    }
})

export const  { setUser,removeUser } = UserSlice.actions

export const UserSelector = (state:any)=>state.UserSlice.user