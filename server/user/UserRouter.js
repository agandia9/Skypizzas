const express = require('express')
const userRouter = express.Router()

const userLogic = new(require('./UserLogic'))

userRouter.route('/')
    .get((req,res)=>{
        userLogic.listUsers()
            .then(users=>{
                res.json({
                    status: 'OK',
                    message: 'Users listed successfully',
                    data: users
                })
            })
            .catch(err=>{
                res.json({
                    status: 'KO',
                    message: err.message
                })
            })
    })
    .post((req,res)=>{
        const {names} = req.body 
        userLogic.addUsers(names)
            .then(user=>{
                res.json({
                    status: 'OK',
                    message: 'Users created successfully',
                    data: user
                })
            })
            .catch(err=>{
                res.json({
                    status: 'KO',
                    message: err.message
                })
            })
    })

module.exports = userRouter