const { create, get, addMessage } = require('../controllers/chatControllers')
const express = require('express')
const router = express.Router()

router.post('/create', create)
router.get('/:chatid', get)
router.put('/:chatid',addMessage)
module.exports = router