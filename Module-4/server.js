const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(logger('dev'))

const router = require('./routes')

//use router to resolve routes
app.use('/', router)

app.listen(3000)
