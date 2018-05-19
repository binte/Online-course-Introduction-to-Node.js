const filters = require('./filters.js')
const aux = require('./auxiliary.js')

module.exports = {

	getComments(req, resp) {
		
		try {
			let post = filters.filterPosts(req, resp)
			resp.status(200).send(post.comments)
		} catch (err) {
			return resp.status(404).send({ error : err })
		}
	},
	
	addComment(req, resp) {

		try {
			let post = filters.filterPosts(req, resp)

			// Only accepts posts with a text field
			filters.filterReqTextField(req)
/* 			if( req.body.text === undefined || !req.body.text.trim()) {
				return resp.status(400).json({ error : 'JSON not correctly formed : comments should have a text field'})
			}
 */			
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
		} catch (err) {
			return resp.status(404).send({ error : err })
		}

		resp.sendStatus(204)
	},
	
	updateComment(req, resp) {
		
		try {
			post = filters.filterPosts(req, resp)
			comment = filters.filterComments(req, resp, post)

			// Only accepts posts with a text field
			filters.filterReqTextField(req)
			/* if( req.body.text === undefined || !req.body.text.trim()) {
				return resp.status(400).json({ error : 'JSON not correctly formed : comments should have a text field'})
			} */
			
			comment.text = req.body.text;
			
			if( req.body.id !== undefined && req.body.id.trim() ) {
				comment.id = req.body.id.trim()
			}
			
			console.log('comment updated', post)
		} catch (err) {
			return resp.status(404).send({ error : err })
		}

		resp.sendStatus(204)
	},
	
	removeComment(req, resp) {
		
		try {
			post = filters.filterPosts(req, resp)
			comment = filters.filterComments(req, resp, post)
			post.comments = post.comments.filter(function(obj) { return obj.id != comment.id })
		} catch (err) {
			return resp.status(404).send({ error : err })
		}
		
		console.log("comment deleted")
		resp.status(204).json()
	}
}
