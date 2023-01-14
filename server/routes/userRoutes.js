const { registerUser, loginUser, searchUsers, getUser, updateUser, removeUser, getUserChats } = require('../controllers/userControllers')
const express = require('express')
const router = express.Router()
const { protectRoute } = require('../middleware/authHandler')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/search', protectRoute, searchUsers)
router.get('/:userid', protectRoute, getUser)
router.put('/:userid', protectRoute, updateUser)
router.delete('/:userid', protectRoute, removeUser)
router.get('/:userid/chats', protectRoute, getUserChats)

module.exports = router