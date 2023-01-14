import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userService from '../features/user/userService'
import { logout } from '../features/user/userSlice'
import { reset } from '../features/chat/chatSlice'

const SidebarProfileOptions = (props) => {
    const [formData, setFormData] = useState({ id:'', name: '', email: '', password: '', imageURL: '' })

    const { currentUser } = useSelector((state) => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Updates formData
    useEffect(() => {
        if (currentUser) {
            setFormData({
                id:currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                password: (currentUser.password) ? currentUser.password : '123456',
                imageURL: currentUser.imageURL
            })
        }
    }, [currentUser])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const updateUser = (e) => {
        e.preventDefault()
        dispatch(userService.update(formData))
            .then(() => {
                props.changeOptions(false)
                dispatch(reset())
            })
            .catch((error) => {
                console.log(`Update Error: ${error.message}`)
            })
    }
    
    const removeUser = (e) => {
        e.preventDefault()
        dispatch(userService.remove(formData.id))
            .then(() => {
                props.changeOptions(false)
                dispatch(reset())
                dispatch(logout())
                navigate('/')
            })
            .catch((error) => {
                console.log(`Delete Error: ${error.message}`)
            })
    }

    return (
        <div className="flex flex-col rounded border-2 border-gray-100 p-6 ml-4">
            <img className="object-cover bg-white h-16 w-16 mb-3 mx-20 rounded-full" alt="profile" src={currentUser.imageURL} />

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
                value={formData.name}
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
                value={formData.email}
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
                value={formData.password}
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
                value={formData.imageURL}
            />

            <button 
                onClick={updateUser}
                className="bg-white border-2 border-indigo-500 w-full font-bold text-indigo-500 text-lg py-2 mb-4 rounded hover:text-white hover:bg-indigo-600 transition-colors"
            >Update User
            </button>

            <button 
                onClick={removeUser}
                className="bg-white border-2 border-red-500 w-full font-bold text-red-500 text-lg py-2 mb-3 rounded hover:text-white hover:bg-red-600 transition-colors"
            >
                Delete User
            </button>
        </div>
    )
}

export default SidebarProfileOptions
