const mongoose = require('mongoose')

const userInfo = mongoose.Schema({
    uid: {
        type: String,
        required: [true, 'Please add uid']
    },
    name:{
        type: String,
        required: [true, 'Please add displayName']
    },
    imageURL : {
        type: String,
        required: [true, 'Please add userImage']
    }
})

const message = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    senderId:{
        type: String,
        default:''
    },
    text: {
        type: String,
        default:''
    }
})

const chatSchema = mongoose.Schema({
    chatId: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: [true, 'Please add a date'],
        default: Date.now()
    },
    lastMessage: message,
    users: [userInfo],
    messages: [message]
})

module.exports = mongoose.model('Chat', chatSchema)