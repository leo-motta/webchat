const { register, login, search, get, update, remove, getUserChats } = require('../controllers/userControllers')
const express = require('express')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/search', search)
router.get('/:userid', get)
router.put('/:userid', update)
router.delete('/:userid', remove)
router.get('/:userid/chats', getUserChats)

module.exports = router