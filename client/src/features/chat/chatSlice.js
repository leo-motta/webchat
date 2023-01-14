import { createSlice } from "@reduxjs/toolkit"
import chatService from "./chatService"

const initialState = {
    chatList: null,
    currentChat: null
}

export const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers: {
        reset: (state) => {
            state.chatList = null
            state.currentChat = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(chatService.search.fulfilled, (state,action) => {
               state.chatList = action.payload
            })
            .addCase(chatService.addMessage.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
            .addCase(chatService.get.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
    }
})

export const { reset } = chatSlice.actions
export default chatSlice.reducer