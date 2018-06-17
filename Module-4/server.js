const bodyParser = require('body-parser')
const express = require('express')
// const logger = require('morgan')
const mongoose = require('mongoose')

const Account = mongoose.model('Account', { name: String, balance: Number })

const app = express()
app.use(bodyParser.json())
// app.use(logger('dev'))

app.use((req, resp, next) => {
	
	// Make our db accessible to our router	x
    mongoose.connect('mongodb://localhost:27017/accounts')
    req.accounts = Account
    req.mongoose = mongoose
	next()
})

const router = require('./routes')

//use router to resolve routes
app.use('/', router)

app.listen(3000)
