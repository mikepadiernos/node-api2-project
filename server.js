// IMPORT MODULES
const express         = require('express');
const cors            = require('cors');
const favicon         = require('serve-favicon-safe');

// IMPORT DATABASE
const db              = require('./data/db');

// IMPORT ROUTES
const posts           = require('./routes/postsRouter');

// INITIATE EXPRESS AS SERVER
const server          = express();

server.use(express.json());
server.use(cors());

// HANDLER, GET - "/"
server
	.get('/', (request, response) => {
		response.send('Server is ... a go!');
	});

// ROUTER - "/posts"
server.use("/api/posts", posts);
server.use("/posts", posts);

module.exports = server;