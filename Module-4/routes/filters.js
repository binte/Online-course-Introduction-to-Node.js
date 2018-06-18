//filter functions to validate input
module.exports = {
    filterAccounts : function(Account, mongoose, id, callback) {
        this.filterObjectId(mongoose, id, (errFilter, accountId) => {
            try {
                if(errFilter) {
                    return callback(errFilter, null)
                }
                Account.findById(accountId, (error, account) => {
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
    filterObjectId : function (mongoose, id, callback) {
        try {
            return callback(null, mongoose.Types.ObjectId(id))
        }
        catch(err) {
            return callback('Invalid ID', null)
        }
    }
}
