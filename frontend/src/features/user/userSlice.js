import { createSlice } from "@reduxjs/toolkit"
import userService from "./userService"

const initialState = {
    user: null,
    isLoading: true,
    isError: false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(userService.register.fulfilled, (state,action) => {
                state.user = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(userService.register.pending, (state)=> {
                state.isLoading = true
            })
            .addCase(userService.register.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(userService.login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(userService.login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userService.login.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export default userSlice.reducer