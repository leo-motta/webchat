const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')

//@desc     Create a chat
//@route    POST /api/chats/create
//@access   Public
const create = asyncHandler(async(req,res) => {

    const {this_userid, another_userid} = req.body
    
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

    if(chatExists.length > 0) {
        res.status(400)
        throw new Error('Cant create chat: already exists')
    }

    const chat = await Chat.create({
        chatId: chatid,
        date: Date.now(),
        lastMessage:{
            text:"Send a message!"
        },
        users: [{
            uid: thisUser._id,
            name: thisUser.name,
            imageURL: thisUser.imageURL
        },
        {
            uid: anotherUser._id,
            name: anotherUser.name,
            imageURL: anotherUser.imageURL
        }],
        messages:{}
    })

    if(chat) {
        res.status(201).json(chat)
    } else {
        res.status(404)
        throw new Error('Invalid data')
    }
})

//@desc     Retrieve a single chat
//@route    GET /api/chats/:chatid
//@access   Public
const get = asyncHandler(async(req,res) => 
{
    const chatid = req.params.chatid

    const chat = await Chat.findOne({ chatId: chatid })
    if(chat) {
        res.status(200).json(chat)
    } else {
        res.status(404)
        throw new Error('Chat not found!')
    }
})

//@desc     Add a message
//@route    PUT /api/chats/:chatid
//@access   Public
const addMessage = asyncHandler(async(req,res) => {
    const chatid = req.params.chatid
    const {userid, message} = req.body

    const newMessage = {
        date: Date.now(),
        senderId: userid,
        text:message
    }

    try {
        const chat = await Chat.findOneAndUpdate(
        { chatId: chatid }, 
        {
            $set: {
                lastMessage: newMessage
            },
            $push: { 
                messages: newMessage
            }
        },
        {returnOriginal:false})

        res.status(200).json(chat)
    }
    catch(error) {
        console.log('Update error:'+error.message)
        res.status(404)
        throw new Error('Update error!')
    }
})

module.exports = {
    create,
    get,
    addMessage
}