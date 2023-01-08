const { login, register, search, getChats, createChat, addMessage } = require('../controllers/userControllers')
const express = require('express')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/search', search)
router.route('/:userid/chats').get(getChats).post(createChat)
router.route('/:userid/:chatid').put(addMessage)
module.exports = router