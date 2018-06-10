# Online-course-Introduction-to-Node.js
Assignments from a Node.JS online course by Microsoft through EDX website

## Module 1
### Objective
Convert a given csv file (customer-data.csv) into a JSON file.

### Instructions
The following command will execute the converter:

```
node csv2json.js
```

## Module 2 
### Objective
Set up a small server with the help of the Express module, that can manage requests to:

fetch, add, update, delete posts

fetch, add, update, delete comments to each post

### Instructions
Clone the repository (or simply download it) with the command git clone https://github.com/binte/Online-course-Introduction-to-Node.js/tree/master/Module-2

Install the dependencies by cd..ing to the root directory and then executing: 
```
npm install
```

Start the server: 
```
npm start
```

## Module 3
### Objective
Merge two different data sources, and insert the result into a new database. For the effect, run a given number of threads simultaneously.

### Instructions
Clone the repository (or simply download it) with the command git clone https://github.com/binte/Online-course-Introduction-to-Node.js/tree/master/Module-3

Install the dependencies by cd..ing to the root directory, and executing: 
```
npm install
```

Initiate the database on a new terminal, by running: 
```
mongod
```

Finally, run the command (where X is the number of insertions to be executed by each thread): 
```
node .\migration-script.js X
```
