const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModel')

//@desc     Get a chat
//@route    GET /api/chats/:chatid
//@access   Public
const getChat = asyncHandler(async(req,res) => {
    const chatid = req.params.chatid

    const chat = await Chat.findById(chatid)

    if(chat) {
        res.status(201).json(chat)
    } else {
        res.status(404)
        throw new Error('Chat not found!')
    }
})

module.exports = {
    getChat
}