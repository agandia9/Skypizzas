const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VoteSchema = new Schema({
    name: String,
    vote1: String,
    vote2: String,
    vote3: String,
    date: Date
})

module.exports = mongoose.model('Vote',VoteSchema)