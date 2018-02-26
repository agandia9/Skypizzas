const express = require('express')
const adminRouter = express.Router()
const Pin = require('./pin')


adminRouter.route('/pin')
    .post((req,res)=>{
        const {pin} = req.body 

        if(Pin.checkPin(pin)){
            res.json({
                status: 'OK',
                message: 'Correct Pin',
            })
        }else{
            res.json({
                status: 'KO',
                message: 'Incorrect Pin'
            })
        }
    })

module.exports = adminRouter