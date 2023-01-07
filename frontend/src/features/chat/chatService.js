import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

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

const chatService = {
    search,
    create
}

export default chatService