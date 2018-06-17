const filters = require('./filters.js')

module.exports = { 
	getAccounts(req, resp) {
        try {
            let id = req.query.id
            if(id !== undefined) {
                filters.filterAccounts(req, id, (error, account) => {
                    if(error) return resp.status(404).send(error.toString())
                    return resp.json(account)
                })
            }
            else {
                req.accounts.find({}, ({}, {}, function(findError, accounts){
                    if (findError) return resp.status(404).send(findError.toString())
                    return resp.json(accounts)
                }))
            }
        }
        catch(err) {
            return resp.status(404).send(err.toString())
        }
    },
    addAccount(req, resp) {
        try {
            // Only accepts posts containing name
            if( req.body.name === undefined || !req.body.name.trim() ) {
                return resp.status(400).send('JSON not correctly formed : post missing mandatory parameters')
            }
            
            let obj = {
                name : req.body.name,
                balance : (req.body.balance !== undefined) ? parseInt(req.body.balance, 10) : 0
            }
            
            req.accounts.create(obj, (createError, doc) => {
                if (createError) return resp.status(404).send(createError.toString())

                return resp.json(doc)
            })
        }
        catch(err) {
            return resp.status(404).send(err.toString())
        }
    },
    updateAccount(req, resp) {
        try {
			filters.filterAccounts(req, req.params.id, (error, account) => {
				if(error) return resp.status(404).send(error.toString())

				let accounts = req.accounts
				accounts.update(account, {$set: req.body}, (errUpd, results) => {
					  if (errUpd) return resp.status(404).send(errUpd.toString())
					  
					  console.log("updated", account)
					  resp.sendStatus(204)
					})
			 })
		} 
		catch(err) {
			return resp.status(404).send(err.toString())
		}
    },
    removeAccount(req, resp) {
        try {
			filters.filterAccounts(req, req.params.id, (errFilter, account) => {
				if(errFilter) return resp.status(404).send(errFilter.toString())

				let accounts = req.accounts
				accounts.remove(account, (error, results) => {
					if (error) return resp.status(404).send(errUpd)
					
					console.log("removed", account)
					return resp.status(204).json()
				})
			})
		}
		catch (err) {
			return resp.status(404).send(err.toString())
		}
	}
}
