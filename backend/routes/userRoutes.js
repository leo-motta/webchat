const { login, register, search, getChats, createChat } = require('../controllers/userControllers')
const express = require('express')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/search', search)
router.route('/:userid/chats').get(getChats).post(createChat)
module.exports = router