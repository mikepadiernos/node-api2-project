// DEFAULT PORT
const port            = process.env.port || 4444;

// IMPORT MODULES
const express         = require('express');
const cors            = require('cors');

// IMPORT DATABASE
const db              = require('./data/db');

// INITIATE EXPRESS AS SERVER
const server          = express();

server.use(express.json());
server.use(cors());

// HANDLER, GET - "/"
server.get('/', (request, response) => {
	response.send('Server... is go');
});

server.listen(port, error => {
	if (error) {
		return console.log("What's the error? ", error);
	}
	console.log("Server is listening on port: ", port);
});