import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

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
            console.log(error.message)     
            return thunkAPI.rejectWithValue(error.message) 
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
            console.log(error.message)     
            return thunkAPI.rejectWithValue(error.message) 
        }
    }
)

//GET /api/users/:userid
const asyncGetUser = async(userid) => {
    const response = await axios.get('/api/users/' + userid)
    return response.data
}
const get = createAsyncThunk(
    'user/get',
    async(userid, thunkAPI) => {
        try {
            return await asyncGetUser(userid)
        } catch(error) {
            console.log(error.message)     
            return thunkAPI.rejectWithValue(error.message) 
        }
    }
)

//GET /api/users/search?name=''
const asyncUserSearch = async(name) => {
    const response = await axios.get('/api/users/search', { params: { name: name } })
    return response.data
}
const search = createAsyncThunk(
    'user/search',
    async(name,thunkAPI) => {
        try {
            return await asyncUserSearch(name)
        } catch(error) {
            console.log(error.message)     
            return thunkAPI.rejectWithValue(error.message) 
        }
    }
)

//PUT /api/users/:userid
const asyncUpdateUser = async(userData) => {
    const response = await axios.put('/api/users/' + userData.id, userData);
    return response.data
}
const update = createAsyncThunk(
    'user/update',
    async(userData, thunkAPI) => {
        try {
            return await asyncUpdateUser(userData)
        } catch(error) {
            console.log(error.message)     
            return thunkAPI.rejectWithValue(error.message) 
        }
    }
)

const userService = {
    register,
    login,
    get,
    search,
    update
}

export default userService