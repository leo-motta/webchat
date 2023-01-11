const { login, register, search, getUserChats } = require('../controllers/userControllers')
const express = require('express')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/search', search)
router.get('/:userid/chats', getUserChats)

module.exports = router