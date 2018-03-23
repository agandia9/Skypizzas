require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const scraperRouter = require('./scraper')
const voteRouter = require('./vote/VoteRouter')
const userRouter = require('./user/UserRouter')
const adminRouter = require('./admin/AdminRouter')

app.use(require('./cors'))
app.use(bodyParser.json())

app.use('/pizzas', scraperRouter)
app.use('/votes', voteRouter)
app.use('/users', userRouter)
app.use('/admin', adminRouter)

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL)


app.listen(process.env.PORT)

console.log(`Up on port ${process.env.PORT}`)

exports= module.exports = app