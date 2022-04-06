require("dotenv").config();
const express = require("express");
const schema = require(__dirname + "/schema.js");
const security = require(__dirname + "/securityFunctions.js");
const app = express();

function closeServer (serverToClose) {
	serverToClose.close(() => {
		process.exit(0);
	});
	setTimeout(() => {
		console.log("Process couldn't close in time");
		process.exit(1);
	}, 100000);
}

let server = app.listen(process.env.PORT, () => {
	console.log("Started listening at port " + process.env.PORT);
	console.log(schema);
	console.log(security);
	if (process.argv[2] === "build") {
		setTimeout(() => {
			closeServer(server);
		}, 1000);
	}
});

app.get("/", (req, res) => {
	res.send("Welcome to the KSDT API");
});

app.get("/users/:userID", (req, res) => {
	res.send("Testing!");
});


