import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const SidebarProfileOptions = () => {
    const [profileOptionsForm, setProfileOptionsForm] = useState({ name: '', email: '', password: '', imageURL: '' })
    const { currentUser } = useSelector((state) => state.user)
    //Updates profileOptionsForm
    useEffect(() => {
        if (currentUser) {
            setProfileOptionsForm({
                name: currentUser.name,
                email: currentUser.email,
                password: (currentUser.password) ? currentUser.password : '123456',
                imageURL: currentUser.imageURL
            })
        }
    }, [currentUser])

    const onChange = (e) => {
        setProfileOptionsForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="flex flex-col rounded border-2 border-gray-100 p-6 ml-4">
            <img className="h-16 w-16 mb-3 mx-20 rounded-full" alt="profile" src={currentUser.imageURL} />

            <label 
                htmlFor="user"
                className="text-xs"
            >Name</label>
            <input
                id="user"
                className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                name="name"
                type="text"
                placeholder="Change your name"
                onChange={onChange}
                value={profileOptionsForm.name}
            />
            
            <label 
                htmlFor="email"
                className="text-xs"
            >Email</label>
            <input  
                id="email"
                className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                type="email"
                name="email"
                placeholder="Change your email"
                onChange={onChange}
                value={profileOptionsForm.email}
            />

            <label 
                htmlFor="password"
                className="text-xs"
            >Password</label>
            <input
                id="password"
                className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-3 focus:border-gray-400 transition-colors"
                type="password"
                name="password"
                placeholder="Change your password"
                onChange={onChange}
                value={profileOptionsForm.password}
            />

            <label 
                htmlFor="imageurl"
                className="text-xs"
            >Image URL</label>
            <input
                id="imageurl"
                className="w-full rounded py-2 border-2 border-gray-200 text-gray-500 px-3 outline-none mb-4 focus:border-gray-400 transition-colors"
                type="text"
                name="imageURL"
                placeholder="Change your image URL"
                onChange={onChange}
                value={profileOptionsForm.imageURL}
            />

            <button 
                onClick={() => console.log(profileOptionsForm)} 
                className="bg-white border-2 border-indigo-500 w-full font-bold text-indigo-500 text-lg py-2 mb-4 rounded hover:text-white hover:bg-indigo-600 transition-colors"
            >Update User
            </button>

            <button 
                className="bg-white border-2 border-red-500 w-full font-bold text-red-500 text-lg py-2 mb-3 rounded hover:text-white hover:bg-red-600 transition-colors"
            >
                Delete User
            </button>
        </div>
    )
}

export default SidebarProfileOptions
