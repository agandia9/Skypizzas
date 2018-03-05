const express = require('express')
const voteRouter = express.Router()

const voteLogic = new(require('./VoteLogic'))


voteRouter.route('/')
    .get((req,res)=>{
        voteLogic.listActualVotes()
            .then(votes=>{
                res.json({
                    status: 'OK',
                    message: 'Votes listed successfully',
                    data: votes
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
        const {name, vote1, vote2, vote3} = req.body 
        voteLogic.addVote(name, vote1, vote2, vote3)
            .then(vote=>{
                res.json({
                    status: 'OK',
                    message: 'Vote created successfully',
                    data: vote
                })
            })
            .catch(err=>{
                res.json({
                    status: 'KO',
                    message: err.message
                })
            })
    })

voteRouter.route('/reset')
    .post((req,res)=>{
        const {pin} = req.body 
        voteLogic.resetVotes(pin)
            .then(votes=>{
                res.json({
                    status: 'OK',
                    message: 'Users votes reset successfully',
                    data: votes
                })
            })
            .catch(err=>{
                res.json({
                    status: 'KO',
                    message: err.message
                })
            })
    })

module.exports = voteRouter