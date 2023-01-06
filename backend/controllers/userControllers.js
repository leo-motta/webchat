const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc     Register a new user
//@route    POST /api/users/register
//@access   Public
const register = asyncHandler(async(req,res) => {

    const { name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Invalid data')
    }

    //Check if user already exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    
    //Creates user
    const user = await User.create({
        name:name,
        email:email,
        password:password
    })
    if(user) {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            imageURL:user.imageURL,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc     Login a user
//@route    POST /api/users/login
//@access   Public
const login = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    //Check if user already exists
    const user = await User.findOne({email})
    if(user) {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            imageURL:user.imageURL
        })
        throw new Error('User already exists')
    }
    else {
        res.status(401)
        throw new Error('User not found!')
    }
})

module.exports = {
    login,
    register
}