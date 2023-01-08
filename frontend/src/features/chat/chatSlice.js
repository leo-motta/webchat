import { createSlice } from "@reduxjs/toolkit"
import chatService from "./chatService"

const initialState = {
    chats: null,
    chat: null
}

export const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers: {
        selectChat: (state, action) => {
            state.chat = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(chatService.search.fulfilled, (state,action) => {
               state.chats = action.payload
            })
    }
})

export const { selectChat } = chatSlice.actions
export default chatSlice.reducer