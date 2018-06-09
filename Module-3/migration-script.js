const fs = require('fs')
const path = require('path')
const async = require('async')
const mongo = require('mongodb')
const db = require('monk')('localhost:27017/bitcoinAgency')

var tryParseInt = function(val, radix)
{
    try
    {
        // check if this object is not null
        if (val != null)
        {
            //check to see the string is not NaN, if not parse
            let res = parseInt(val, radix)
            if (!isNaN(res)) {
              if(res != 0)
                return res
            }
        }
    }
    catch (err)
    {
        console.log('error' + err)
        process.exit(1)
    }

    throw('Invalid input')
}

const insertMany = function(objs, callback) {
  let collection = db.get('Customers'), resultsArray = '', nObjs = objs.length, objsProcessed = 0
  objs.forEach(obj => {
    collection.insert(obj, (error) => {
      objsProcessed++
      if (error) { callback(error, null) }
      resultsArray+=("successfully inserted object with id " + obj.id + "\n")
      if(objsProcessed === nObjs) {
        callback(null, resultsArray)
      }
    })
  });
}

const migrate = (entriesPerQuery = 1, customerData = 'm3-customer-data.json', customerAddressData = 'm3-customer-address-data.json') => {

  try {
    entriesPerQuery = tryParseInt(entriesPerQuery, 10);
  }
  catch(error) {
    console.log(error)
    process.exit(1)
  }

  fs.readFile(path.join(__dirname, customerData), {encoding: 'utf-8'}, function (error, data) {
    if (error) return console.error(error)

    let json = JSON.parse(data), it=0

    fs.readFile(path.join(__dirname, customerAddressData), {encoding: 'utf-8'}, function (err, addressData) {
      if (err) return console.error(err)
      
      let jsonAddresses = JSON.parse(addressData), l=json.length, its=Math.floor(l / entriesPerQuery), rest=0

      if( (rest=l % entriesPerQuery) != 0) its++

      let tasks = [], resultsArray = ''
      for (let i = 0; i < its; i++) { 

        let objs = []
        for (let k = i*entriesPerQuery, j=0; j < ( (rest>0 && i==its-1) ? rest : entriesPerQuery); k++, j++) {
          objs.push(Object.assign(json[k], jsonAddresses[k]))
        }

        tasks.push(
          function(callback) { insertMany(objs, (insertError, results) => {
              if (insertError) callback(insertError, null)
              callback(null, results)
            })
          })
      }

      async.parallel(tasks, (taskError, finalResults) => {
        if (taskError) console.error(taskError)
        console.log(finalResults.join(""))
        process.exit(0)
      })
    })
  })
}

migrate(process.argv[2])
