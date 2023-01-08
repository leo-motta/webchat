const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorHandler')
const connectDB = require('./config/db.js')

console.log(process.env.MONGO_URI)

connectDB()
const app = express()
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/chats', require('./routes/chatRoutes'))

app.use(errorHandler)