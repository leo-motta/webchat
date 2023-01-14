const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')
const { generateToken } = require('../middleware/authHandler')
const bcrypt = require('bcryptjs')
const url = require('url')

//@desc     Register a new user
//@route    POST /api/users/register
//@access   Public
const registerUser = asyncHandler(async(req,res) => {

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

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    //Creates user
    const user = await User.create({
        name:name,
        email:email,
        password:hashedPassword
    })
    if(user) {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            imageURL:user.imageURL,
            token:generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc     Login a user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async(req,res) => {

    const {email, password} = req.body

    //Check if user already exists
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            imageURL:user.imageURL,
            token:generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid user!')
    }
})

//@desc     Search users
//@route    GET /api/users/search?name=''
//@access   Private
const searchUsers = asyncHandler(async(req,res) => {

    const queryObject = url.parse(req.url, true).query;

    var username = new RegExp('^.*'+ queryObject.name);

    const userSearch = await User.find({ name: username })

    if(userSearch && userSearch.length > 0) {
        const userList = userSearch.map(({_id,name,email,imageURL})=>({_id,name,email,imageURL}))
        res.status(200).json(userList)
    }  else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc     Retrieve a single user
//@route    GET /api/users/:userid
//@access   Private
const getUser = asyncHandler(async(req,res) => {
    const userid = req.params.userid

    const user = await User.findById(userid)

    if(user) {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            imageURL:user.imageURL
        })
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

//@desc     Update a user
//@route    PUT /api/users/:userid
//@access   Private
const updateUser = asyncHandler(async(req,res) => {

    const userid = req.params.userid
    const { name, email, password, imageURL } = req.body
    const updatedAt = new Date().toISOString()
    try {
        const user = await User.findByIdAndUpdate(
        userid,
        {
            $set: {
                name: name,
                email: email,
                password: password,
                imageURL: imageURL,
                updatedAt: updatedAt
            }
        },
        { returnOriginal:false})
        let updatedUser = user.toObject()
        //Generate a new token
        updatedUser.token = generateToken(userid)
        res.status(200).json(updatedUser)
    }
    catch(error) {
        console.log('Update error:'+error.message)
        res.status(400)
        throw new Error('Update error!')
    }
})

//@desc     Remove a user
//@route    DELETE /api/users/:userid
//@access   Private
const removeUser = asyncHandler(async(req,res) => {
    const userid = req.params.userid

    try {
       const user = await User.findByIdAndDelete(userid)
        res.status(200).json(user)
    }
    catch(error) {
        console.log('Delete error:'+error.message)
        res.status(400)
        throw new Error('Delete error!')
    }
})

//@desc     Retrieve user chats
//@route    GET /api/users/:userid/chats
//@access   Private
const getUserChats = asyncHandler(async(req,res) => {

    var regex = new RegExp('^.*'+ req.params.userid);

    const chat = await Chat.find({chatId: regex })

    if(chat) {
        res.status(200).json(chat)
    } else {
        res.status(404)
        throw new Error('No chats found')
    }
})

module.exports = {
    registerUser,
    loginUser,
    searchUsers,
    getUser,
    updateUser,
    removeUser,
    getUserChats
}