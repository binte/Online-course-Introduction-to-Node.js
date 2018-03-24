const aux = require('./auxiliary.js')

module.exports = function(app, store) {

	app.get('/posts/:postId/comments', (req, resp) => {
		let postId = req.params.postId, post

		if( (post = store.posts.find(x => x.id == postId)) === undefined) {
			return resp.status(500).send({ error : 'Unexistent ID' })
		}
		
		resp.send(post.comments)
	})
	
	app.post('/posts/:postId/comments', (req, resp) => {
		let postId = req.params.postId, post

		if( (post = store.posts.find(x => x.id == postId)) === undefined) {
			return resp.status(500).send({ error : 'Unexistent ID' })
		}
		
		// Only accepts posts with a text field
		if( req.body.text === undefined || !req.body.text.trim()) {
			return resp.status(400).json({ error : 'JSON not correctly formed : comments should have a text field'})
		}
		
		let obj = {
			text : req.body.text
		}
		
		if( req.body.id === undefined || !req.body.id.trim() ) {
			obj.id = aux.nextId(post.comments)
		}
		else {
			obj.id = req.body.id.trim()
		}
		
		post.comments.push(obj)
		console.log('added comment', post)
		resp.sendStatus(204)
	})
	
	app.put('/posts/:postId/comments/:commentId', (req, resp) => {
		
		let postId = req.params.postId, post, commentId = req.params.commentId, comment

		if( (post = store.posts.find(x => x.id == postId)) === undefined) {
			return resp.status(500).send({ error : 'Unexistent post ID' })
		}
		
		if( (comment = post.comments.find(x => x.id == commentId)) === undefined ) {
			return resp.status(500).send({ error : 'Unexistent comment ID within the chosen Post' })
		}
		
		// Only accepts posts with a text field
		if( req.body.text === undefined || !req.body.text.trim()) {
			return resp.status(400).json({ error : 'JSON not correctly formed : comments should have a text field'})
		}
		
		comment.text = req.body.text;
		
		if( req.body.id !== undefined && req.body.id.trim() ) {
			comment.id = req.body.id.trim()
		}
		
		console.log('comment updated', post)
		resp.sendStatus(204)
	})
	
	app.delete('/posts/:postId/comments/:commentId', (req, resp) => {
		
		let postId = req.params.postId, post, commentId = req.params.commentId

		if( (post = store.posts.find(x => x.id == postId)) === undefined) {
			return resp.status(500).send({ error : 'Unexistent post ID' })
		}
		
		if( post.comments.find(x => x.id == commentId) === undefined ) {
			return resp.status(500).send({ error : 'Unexistent comment ID within the chosen Post' })
		}
		
		post.comments = post.comments.filter(function(obj) { return obj.id != commentId })
		console.log("comment deleted")
		resp.status(204).json()
	})
}