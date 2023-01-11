import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//POST /api/users/:userid/chats/
const asyncCreateChat = async(userid, anotherid) => {
    const response = await axios.post('/api/users/' + userid + '/chats', { another_userid: anotherid })
    return response.data
}
const create = createAsyncThunk(
    'chat/create',
    async (object,thunkAPI) => {
        try {
            return await asyncCreateChat(object.this_userid,object.another_userid)
        } catch(error) {
            console.log(error.message)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

//GET /api/chats/:chatid/
const asyncGetChat = async(chatid) => {
    const response = await axios.get('/api/chats/' + chatid)
    return response.data
}
const get = createAsyncThunk(
    'chat/get',
    async (chatid,thunkAPI) => {
        try {
            return await asyncGetChat(chatid)
        } catch(error) {
            console.log(error.message)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

//PUT /api/users/:userid/:chatid/
const asyncAddMessage = async(userid, chatid, message) => {
    const response = await axios.put('/api/users/' + userid + '/'+ chatid, { message: message })
    return response.data
}
const addMessage = createAsyncThunk(
    'chat/addMessage',
    async (object,thunkAPI) => {
        try {
            return await asyncAddMessage(object.userid,object.chatid,object.message)
        } catch(error) {
            console.log(error.message)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

//GET /api/users/:userid/chats
const asyncSearchChat = async(userid) => {
    const response = await axios.get('/api/users/' + userid + '/chats')
    return response.data
}
const search = createAsyncThunk(
    'chat/search',
    async (userid,thunkAPI) => {
        try {
            return await asyncSearchChat(userid)
        } catch(error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const chatService = {
    create,
    get,
    addMessage,
    search
}

export default chatService