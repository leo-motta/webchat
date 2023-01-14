import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

function extractErrorMessage(error) {
    return error.response?.data?.message || error.message || error.toString()
}

//POST /api/users/register
const asyncRegisterUser = async(userData) => {
    const response = await axios.post('/api/users/register', userData)
    return response.data
}
const register = createAsyncThunk(
    'user/register',
    async(userData,thunkAPI) => {
        try {
            return await asyncRegisterUser(userData)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

//POST /api/users/login
const asyncLoginUser = async(userData) => {
    const response = await axios.post('/api/users/login', userData)
    return response.data
}
const login = createAsyncThunk(
    'user/login',
    async(userData,thunkAPI) => {
        try {
            return await asyncLoginUser(userData)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

//GET /api/users/search?name=''
const asyncUserSearch = async(name, token) => {
    const config = {
        params: { 
            name: name 
        }, 
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get('/api/users/search', config)
    return response.data
}
const search = createAsyncThunk(
    'user/search',
    async(name,thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.currentUser.token
            return await asyncUserSearch(name, token)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

//GET /api/users/:userid
const asyncGetUser = async(userid, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get('/api/users/' + userid, config)
    return response.data
}
const get = createAsyncThunk(
    'user/get',
    async(userid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.currentUser.token
            return await asyncGetUser(userid, token)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

//PUT /api/users/:userid
const asyncUpdateUser = async(userData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put('/api/users/' + userData.id, userData, config);
    return response.data
}
const update = createAsyncThunk(
    'user/update',
    async(userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.currentUser.token
            return await asyncUpdateUser(userData,token)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

//DELETE  /api/users/:userid
const asyncRemoveUser = async(userid, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete('/api/users/' + userid, config)
    return response.data
}
const remove = createAsyncThunk(
    'user/get',
    async(userid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.currentUser.token
            return await asyncRemoveUser(userid, token)
        } catch(error) {
            console.log(extractErrorMessage(error))
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

const userService = {
    register,
    login,
    search,
    get,
    update,
    remove
}

export default userService