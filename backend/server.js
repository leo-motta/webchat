const express = require('express')
const dotenv = require('dotenv').config()
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