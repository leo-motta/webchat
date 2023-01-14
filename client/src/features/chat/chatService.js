import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

function extractErrorMessage(error) {
    return error.response?.data?.message || error.message || error.toString()
}

//POST /api/chats/create
const asyncCreateChat = async(userid, anotherid, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post('/api/chats/create', { this_userid: userid ,another_userid: anotherid }, config)
    return response.data
}
const create = createAsyncThunk(
    'chat/create',
    async (object,thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.currentUser.token
            return await asyncCreateChat(object.this_userid,object.another_userid, token)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

//GET /api/chats/:chatid
const asyncGetChat = async(chatid, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get('/api/chats/' + chatid, config)
    return response.data
}
const get = createAsyncThunk(
    'chat/get',
    async (chatid,thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.currentUser.token
            return await asyncGetChat(chatid, token)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

//GET /api/users/:userid/chats
const asyncSearchChat = async(userid, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get('/api/users/' + userid + '/chats', config)
    return response.data
}
const search = createAsyncThunk(
    'chat/search',
    async (userid,thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.currentUser.token
            return await asyncSearchChat(userid, token)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

//PUT /api/chats/:chatid
const asyncAddMessage = async(userid, chatid, message, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put('/api/chats/'+ chatid, { userid: userid, message: message }, config)
    return response.data
}
const addMessage = createAsyncThunk(
    'chat/addMessage',
    async (object,thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.currentUser.token
            return await asyncAddMessage(object.userid,object.chatid,object.message, token)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

const chatService = {
    create,
    get,
    search,
    addMessage,
}

export default chatService