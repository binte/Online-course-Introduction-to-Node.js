//filter functions to validate input for postId and commentId
module.exports = {
    filterPosts : function(req, res) {
        let postId = req.params.id, post
        if( (post = req.store.posts.find(x => x.id == postId)) === undefined) {
            throw("Non existing post")
        }
        return post
    },
    filterComments : function (req, res, post) {
        let commentId = req.params.commentId, comment
        if( (comment = post.comments.find(x => x.id == commentId)) === undefined ) {
			throw("Non existing comment")
        }
        return comment
    },
    filterReqTextField : function (req) {
        if( req.body.text === undefined || !req.body.text.trim()) {
            throw("JSON not correctly formed : comments should have a text field")
        }
    }
}
