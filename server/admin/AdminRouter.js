require('dotenv').config()
const express = require('express')
const adminRouter = express.Router()


adminRouter.route('/pin')
    .post((req,res)=>{
        const {pin} = req.body 

        if(pin === process.env.PIN){
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