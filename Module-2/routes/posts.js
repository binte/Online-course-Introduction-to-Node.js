const aux = require('./auxiliary.js')

module.exports = { 
	
	getPosts(req, resp, store) {
		let postId = req.query.id, post

		if(postId) {
		
			if( (post = store.posts.find(x => x.id == postId)) === undefined) {
				return resp.status(500).json({ error : 'Unexistent ID' })
			}

			return resp.json(post)			
		}
		
		resp.json(store.posts)
	},
	
	addPost(req, resp, store) {
		// Only accepts posts containing user, title and content
		if( req.body.user === undefined || req.body.title === undefined || req.body.content === undefined ||
			!req.body.user.trim() || !req.body.title.trim() || !req.body.content.trim()) {
			return resp.status(400).json({ error : 'JSON not correctly formed : post missing mandatory parameters'})
		}
		
		let obj = {
			id : aux.nextId(store.posts),
			user : req.body.user,
			date : new Date(),
			title : req.body.title,
			content : req.body.content,
			comments : []
		}
		
		/* If there's no comments, the new post will have an empty array in the comments parameter 
		 * Otherwise validates the comments before accepting them as a parameter
		 */
		if( ! (req.body.comments === undefined) ) {
			
			if(!(req.body.comments.constructor === Array)) {
				return resp.status(400).json({ error : 'JSON not correctly formed : comments parameter is not an array'})
			}

			for(var i=0, len=req.body.comments.length; i<len; i++) {
				
				let comment = req.body.comments[i]
				
				if( comment.text === undefined || !comment.text.trim() ) {
					return resp.status(400).json({ error : 'JSON not correctly formed : text parameter missing in a comment'})
				}
				else {
					
					let newComment = {
						text : comment.text.trim()
					}
					
					if( comment.id === undefined || !comment.id.trim() ) {
						newComment.id = aux.nextId(obj.comments)
					}
					else {
						newComment.id = comment.id.trim()
					}
					
					obj.comments.push(newComment)
				}
			}
		}
		
		store.posts.push(obj)
		console.log('created', obj)
		resp.sendStatus(204)
	},

	updatePost(req, resp, store) {
		
		let postId = req.params.id, post
		if( (post = store.posts.find(x => x.id == postId)) === undefined) {
			return resp.status(500).json({ error : 'Unexistent ID' })
		}
		
		Object.assign(post, req.body)
		console.log("updated", post)
		resp.sendStatus(204)
	},
	
	removePost(req, resp, store) {
			
		let postId = req.params.id, post
		if( (post = store.posts.find(x => x.id == postId)) === undefined) {
			return resp.status(500).json({ error : 'Unexistent ID' })
		}
		
		store.posts = store.posts.filter(function(obj) { return obj.id != postId })
		console.log("deleted")
		resp.status(204).json()
	}
}
