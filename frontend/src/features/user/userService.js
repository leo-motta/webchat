import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

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

const userService = {
    login,
    register
}

export default userService