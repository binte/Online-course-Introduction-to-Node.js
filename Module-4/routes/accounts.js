const mongoose = require('mongoose')
const filters = require('./filters.js')

const Account = mongoose.model('Account', { name: String, balance: Number })

mongoose.connect('mongodb://localhost:27017/accounts')

module.exports = { 
	getAccounts(req, resp) {
        try {
            let id = req.query.id
            if(id !== undefined) {
                filters.filterAccounts(Account, mongoose, id, (error, account) => {
                    if(error) return resp.status(404).send(error.toString())
                    return resp.json(account)
                })
            }
            else {
                Account.find((function(findError, accounts){
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

            if( req.body.balance === undefined || !req.body.balance.trim() ) {
                req.body.balance = 0
            }

            let account = new Account(req.body)
            account.save((saveError, doc) => {
                if (saveError) return resp.status(404).send(saveError.toString())

                return resp.json(doc)
            })
        }
        catch(err) {
            return resp.status(404).send(err.toString())
        }
    },
    updateAccount(req, resp) {
        try {
			filters.filterAccounts(Account, mongoose, req.params.id, (error, account) => {
				if(error) return resp.status(404).send(error.toString())

				account.update(req.body, (errUpd, results) => {
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
			filters.filterAccounts(Account, mongoose, req.params.id, (errFilter, account) => {
				if(errFilter) return resp.status(404).send(errFilter.toString())

				account.remove( (error) => {
					if (error) return resp.status(404).send(error)
					
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
