import React from 'react'
import {useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-indigo-100">
            <form>
                <div className="bg-white w-96 h-[27.6rem] p-10 rounded shadow-sm">
                    <p className="text-indigo-500 mb-8 text-4xl text-center font-semibold">webchat</p>
                    <input 
                        required
                        className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                        name="displayName"
                        type="text"
                        placeholder="name"
                    />
                    <input
                        required
                        className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                        type="email"
                        name="email"
                        placeholder="email"
                    />
                    <input
                        required
                        className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    <button className="bg-indigo-500 w-full text-gray-100 font-bold text-lg py-2 rounded hover:bg-indigo-600 transition-colors">Sign Up</button>
                    
                    <hr className=" my-4 leading-6 text-black"></hr>
                    
                    <button 
                        onClick={() => { navigate('/') }}
                        className="bg-violet-500 w-full text-gray-100 text-center font-bold text-lg py-2 rounded hover:bg-violet-600 transition-colors"
                    >
                        Sign in with your account!
                    </button>
                </div>
            </form>
            
        </div>
    )
}

export default SignUp
