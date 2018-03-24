const bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.use(bodyParser.json())

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

const postsAPI = require('./routes/posts.js')(app, store)
const commentsAPI = require('./routes/comments.js')(app, store)

app.listen(3000)
