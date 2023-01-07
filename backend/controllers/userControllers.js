const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')
const url = require('url');

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

//@desc     Search users
//@route    GET /api/users/search?name=''
//@access   Public
const search = asyncHandler(async(req,res) => {
 
    const queryObject = url.parse(req.url, true).query;

    var username = new RegExp('^.*'+ queryObject.name);

    const userSearch = await User.find({ name: username })

    if(userSearch && userSearch.length > 0) {
        const userList = userSearch.map(({_id,name,email,imageURL})=>({_id,name,email,imageURL}))
        res.status(201).json(userList)
    }  else {
        res.status(404)
        throw new Error('User not found')
    }
}) 

//@desc     Get chats
//@route    GET /api/users/:userid/chats
//@access   Public
const getChats = asyncHandler(async(req,res) => {

    var regex = new RegExp('^.*'+ req.params.userid);

    const chat = await Chat.find({chatId: regex })

    if(chat) {
        res.status(201).json(chat)
    } else {
        res.status(404)
        throw new Error('No chats found')
    }
})


//@desc     Creates a chat
//@route    POST /api/users/:userid/chats
//@access   Public
const createChat = asyncHandler(async(req,res) => {

    const this_userid = req.params.userid
    const {another_userid} = req.body

    if( another_userid === this_userid ) {
        res.status(400)
        throw new Error('Cant create chat: same user')
    }

    const thisUser = await User.findById(this_userid)
    const anotherUser = await User.findById(another_userid)

    if(!anotherUser) {
        res.status(400)
        throw new Error('Cant create chat: user not found')
    }

    const chatid = this_userid > another_userid
    ? this_userid + another_userid
    : another_userid + this_userid

    const chatExists = await Chat.find({chatId: chatid })

    if(!chatExists) {
        res.status(400)
        throw new Error('Cant create chat: already exists')
    }

    const chat = await Chat.create({
        chatId: chatid,
        date: Date.now(),
        lastMessage:'last message',
        firstUser: {
            uid: thisUser._id,
            name: thisUser.name,
            imageURL: thisUser.imageURL
        },
        secondUser: {
            uid: anotherUser._id,
            name: anotherUser.name,
            imageURL: anotherUser.imageURL
        },
        messages:{}
    })

    if(chat) {
        res.status(201).json(chat)
    } else {
        res.status(404)
        throw new Error('Invalid data')
    }
})

module.exports = {
    login,
    register,
    search,
    getChats,
    createChat
}