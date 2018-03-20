const readLine = require('readline')
const fs = require("fs")

const csv2json = (fileName = 'customer-data') => {

	var count = 0, nVars = 0;
	var variables = []
	var entries = []
	
	var lineReader = readLine.createInterface({
	  input: fs.createReadStream(fileName + ".csv")
	});

	lineReader.on('line', (line, callback) => {
	  
	  if(count == 0) {  // First line
		
		variables = line.split(",")
		nVars = variables.length
	  }
	  else {  // remaining lines
		
		var values = line.split(",")
		
		var entry = new Object()
		for( var i=0; i<nVars; i++) {
			entry[variables[i]] = values[i]
		}

		entries.push(entry);
	  }
	  
	  count++;
	})
	
	lineReader.on('close', () => {
		
		fs.writeFile(fileName + ".json", JSON.stringify(entries, null, " "), (error) => {

			if(error) 
				return process.exit(1)
		}); 
		
		console.log("File converted successfully")
	})
}

csv2json(process.argv[2])
