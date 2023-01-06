const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc     Register a new user
//@route    POST /api/users/register
//@access   Public
const register = asyncHandler(async(req,res) => {

    const { name, email, password} = req.body

    //Check if user already exists
    User.findOne({email})
        .then((response)=> {
            if(response) {
                res.status(400)
                throw new Error('User already exists')
            }
        })
    
    User.create({
        name: name,
        email: email,
        password: password
    })
    .then((user)=> {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    })
    .catch((error) => {
        res.status(400)
        throw new Error('Invalid user data: '+ error.message)
    })

})

//@desc     Login a user
//@route    POST /api/users/login
//@access   Public
const login = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    User.findOne({email})
        .then((user) => {
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                imageURL:user.imageURL
            })
        })
        .catch((error) => {
            res.status(401)
            throw new Error('Invalid user data:'+error.message)
        })
})

module.exports = {
    login,
    register
}