// DEFAULT PORT
const port            = process.env.port || 4444;

// IMPORT SERVER
const server          = require('./server');

// SERVER LISTEN ON DEFAULT PORT
server
	.listen(port, error => {
		if (error) {
			return console.log("What's the error? ", error);
		}
		console.log("Server is listening on port:", port);
	});