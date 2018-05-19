const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan');

let store = {
	posts : [{
		id : 0,
		user : 'Celso',
		date: '02/08/2017T10:11:46.404Z',
		title : 'My first post',
		content : 'This is a test post',
		comments : [
			{ id : 0, text : 'Inspiring as usual' },
			{ id : 1, text : 'Your post sucks' }
		]
	}]
}

const app = express()
app.use(bodyParser.json())
app.use(logger('dev'))

app.use((req, resp, next) => {
	
	req.store = store
	next()
})

const router = require('./routes')

//use router to resolve routes
app.use('/', router)

app.listen(3000)
