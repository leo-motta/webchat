const { getChat } = require('../controllers/chatControllers')
const express = require('express')
const router = express.Router()

router.get('/:chatid', getChat)
module.exports = router