import React from 'react'
import {useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-indigo-100">
            <form>
                <div className="bg-white w-96 h-[27.6rem] p-10 rounded shadow-sm">
                    <p className="text-indigo-500 mb-10 text-4xl text-center font-semibold">webchat</p>
                    <input
                    className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                        type="email"
                        name="email"
                        placeholder="email"
                    />
                    <input
                        className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    <button className="bg-indigo-500 w-full text-gray-100 font-bold text-lg py-2 rounded hover:bg-indigo-600 transition-colors">Sign In</button>
                    
                    <p className="  text-blue-400 text-center my-4 "> <a href="/">Forgot your Password?</a> </p>
                    
                    <hr className=" my-4 leading-6 text-black"></hr>
                    
                    <button 
                        onClick={() => { navigate('/register') }}
                        className="bg-violet-500 w-full text-gray-100 text-center font-bold text-lg py-2 rounded hover:bg-violet-600 transition-colors"
                    >
                        Create your account!
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignIn