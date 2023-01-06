import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const login = createAsyncThunk(
    'user/login',
    async(userData,thunkAPI) => {
        axios.post('/api/users/login', userData)
            .then((response) => {
                return response
            })
            .catch((error)=> {
                return thunkAPI.rejectWithValue(error.message)
            })
    }
)

const register = createAsyncThunk(
    'user/register',
    async(userData,thunkAPI) => {
        axios.post('/api/users/register', userData)
            .then((response) => {
                return response
            })
            .catch((error)=> {
                return thunkAPI.rejectWithValue(error.message)
            })
    }
)

const userService = {
    login,
    register
}

export default userService