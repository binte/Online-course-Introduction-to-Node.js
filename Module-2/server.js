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

const routes = require('./routes')

////////////POSTS////////////
app.get('/posts',(req, res) => {
  routes.posts.getPosts(req, res, store);
});

app.post('/posts',(req,res) => {
  routes.posts.addPost(req, res, store);
})

app.put('/posts/:id', (req, res) => {
  routes.posts.updatePost(req, res, store);
});

app.delete('/posts/:id', (req, res) => {
  routes.posts.removePost(req, res, store);
});

////////////COMMENTS////////////
app.get('/posts/:id/comments',(req, res) => {
  routes.comments.getComments(req, res, store);
});

app.post('/posts/:id/comments',(req,res) => {
  routes.comments.addComment(req, res, store);
})

app.put('/posts/:postId/comments/:commentId', (req, res) => {
  routes.comments.updateComment(req, res, store);
});

app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  routes.comments.removeComment(req, res, store);
});

app.listen(3000)
