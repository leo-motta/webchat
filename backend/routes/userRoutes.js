const { login, register, search } = require('../controllers/userControllers')
const express = require('express')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/search', search)
module.exports = router