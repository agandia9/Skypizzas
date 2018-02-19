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
        const {users, pin} = req.body 
        userLogic.addUsers(users,pin)
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
    .delete((req,res)=>{
        const {pin} = req.body 
        userLogic.deleteUsers(pin)
            .then(user=>{
                res.json({
                    status: 'OK',
                    message: 'Users deleted successfully',
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