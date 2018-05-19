const express = require('express')
const posts = require('./posts')
const comments = require('./comments')

const router = express.Router()

///////////////POSTS////////////
router.get('/posts', posts.getPosts)
router.post('/posts', posts.addPost)
router.put('/posts/:id', posts.updatePost)
router.delete('/posts/:id', posts.removePost)

////////////COMMENTS////////////
router.get('/posts/:id/comments', comments.getComments)
router.post('/posts/:id/comments', comments.addComment)
router.put('/posts/:id/comments/:commentId', comments.updateComment)
router.delete('/posts/:id/comments/:commentId',comments.removeComment)

module.exports = router
