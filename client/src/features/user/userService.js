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

//GET /api/users/search?name=''
const asyncUserSearch = async(name) => {
    const response = await axios.get('/api/users/search', { params: { name: name } });
    return response.data
}
const search = createAsyncThunk(
    'user/search',
    async(userData,thunkAPI) => {
        try {
            return await asyncUserSearch(userData)
        } catch(error) {
            console.log(error.message)     
            return thunkAPI.rejectWithValue(error.message) 
        }
    }
)

const userService = {
    register,
    login,
    search
}

export default userService