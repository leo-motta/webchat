import { createSlice } from "@reduxjs/toolkit"
import userService from "./userService"

const initialState = {
    userList:null,
    currentUser: null,
    isLoading: true,
    isError: false,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.userList = null
            state.currentUser = null
            state.isLoading = true
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userService.register.fulfilled, (state,action) => {
                state.currentUser = action.payload
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
                state.currentUser = action.payload
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
            .addCase(userService.search.rejected, (state) => {
                state.userList = null
            })
            .addCase(userService.search.fulfilled, (state, action) => {
                state.userList = action.payload 
            })
            .addCase(userService.update.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
    }
})

export const { logout } = userSlice.actions
export default userSlice.reducer