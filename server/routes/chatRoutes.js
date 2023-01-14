const { createChat, getChat, addMessage } = require('../controllers/chatControllers')
const express = require('express')
const router = express.Router()
const { protectRoute } = require('../middleware/authHandler')

router.post('/create', protectRoute, createChat)
router.get('/:chatid', protectRoute, getChat)
router.put('/:chatid', protectRoute, addMessage)

module.exports = router