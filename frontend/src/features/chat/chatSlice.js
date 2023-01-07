import { createSlice } from "@reduxjs/toolkit"
import chatService from "./chatService"

const initialState = {
    chats: null,
    chat: null
}

export const chatSlice = createSlice({
    name:'chat',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(chatService.search.fulfilled, (state,action) => {
               state.chats = action.payload
            })
    }
})

export default chatSlice.reducer