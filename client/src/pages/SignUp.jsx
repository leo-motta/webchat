import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../features/user/userService'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isError } = useSelector((state) => state.user)
    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = userFormData


    const onChange = (e) => {
        setUserFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            name,
            email,
            password
        }
        dispatch(userService.register(userData))
            .unwrap()
            .then(() => {
                navigate('/home')
            })
            .catch((error) =>  console.log(`Sign in Error: ${error.message}`))
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-indigo-100">
            <div className="bg-white w-96 h-[27.6rem] p-10 rounded shadow-sm">
                <p className="text-indigo-500 mb-8 text-4xl text-center font-semibold">webchat</p>
                <input
                    required
                    className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                    name="name"
                    type="text"
                    placeholder="name"
                    onChange={onChange}
                />
                <input
                    required
                    className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={onChange}
                />
                <input
                    required
                    className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={onChange}
                />
                <button onClick={onSubmit} className="bg-indigo-500 w-full text-gray-100 font-bold text-lg py-2 rounded hover:bg-indigo-600 transition-colors">Sign Up</button>

                <hr className=" my-4 leading-6 text-black"></hr>

                <button
                    onClick={() => { navigate('/') }}
                    className="bg-slate-500 w-full text-gray-100 text-center font-bold text-lg py-2 rounded hover:bg-slate-600 transition-colors"
                >
                    Sign in with your account!
                </button>
            </div>
            {(isError) ? <p className='bg-white rounded p-4 my-6  text-red-500'>Error: Register failed!</p> : <></>}
        </div>
    )
}

export default SignUp
