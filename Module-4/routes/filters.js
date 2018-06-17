//filter functions to validate input
module.exports = {
    filterAccounts : function(req, id, callback) {
        this.filterObjectId(req, id, (errFilter, accountId) => {
            try {
                if(errFilter) {
                    return callback(errFilter, null)
                }
                req.accounts.findOne({'_id': accountId}, (error, account) => {
                    if (error) {
                        return callback(error, null)
                    } 
                    else {
                        if(account === null) {
                            return callback('Nonexistent ID', null) 
                        }
                        return callback(null, account)
                    }
                })
            }
            catch(err) {
                return callback(err, null)
            }
        })
    },
    filterObjectId : function (req, id, callback) {
        try {
            return callback(null, req.mongoose.Types.ObjectId(id))
        }
        catch(err) {
            return callback('Invalid ID', null)
        }
    }
}
