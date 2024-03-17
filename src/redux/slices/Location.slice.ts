import { createSlice } from "@reduxjs/toolkit";

export const LocationSlice = createSlice({
    name: "LocationSlice",
    initialState: {
        location: null
    },
    reducers: {

        setLocation: (state, action) => {
            state.location = action.payload
        }
        ,
        removeLocation: (state, action) => {
            state.location = null
        }
    }
})

export const { setLocation, removeLocation } = LocationSlice.actions

export const LocationSliceAddress = (state: any) => state.LocationSlice.location