const express = require('express')
const adminRouter = express.Router()
const correctPin = "3535"

adminRouter.route('/pin')
    .post((req,res)=>{
        const {pin} = req.body 

        if(pin === correctPin){
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