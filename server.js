require("dotenv").config();
const express = require("express");
const schema = require(__dirname + "/schema.js");
const security = require(__dirname + "/security.js");
const app = express();

app.listen(process.env.PORT, () => {
	console.log("Started listening at port " + process.env.PORT);
	console.log(schema);
	console.log(security);
});

app.get("/", (req, res) => {
	res.send("Welcome to the KSDT API");
});

app.get("/users/:userID", (req, res) => {
	res.send("Testing!");
});
