const express = require('express')

const app = express()

const scraperRouter = require('./scraper')

app.use(require('./cors'))

app.use('/pizzas', scraperRouter)

app.listen('8080')

console.log('Up on port 8080')

exports= module.exports = app