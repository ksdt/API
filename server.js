require("dotenv").config();
const express = require("express");
const schema = require(__dirname + "/schema.js");
const security = require(__dirname + "/securityFunctions.js");
const app = express();
const mongoose = require('mongoose');

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
	//console.log(schema.User);
	//console.log(security);
	if (process.argv[2] === "build") {
		setTimeout(() => {
			closeServer(server);
		}, 3000);
	}
});

app.get("/", (req, res) => {
	res.send("Welcome to the KSDT API");
});

/* This endpoint is a directory for all registerd KSDT users */
app.get("/users/", (req, res) => {
	User.find({}, function(err, users) {
		if (err) {
			console.log("Error!");
		} else {
			//We send the user query to view "users"
			res.render("users", {users: user});

			console.log(users);
		}
	})
	res.send("This is the User Directory Page");
});

app.get("/users/:userID", (req, res) => {
	User.findById(req.params.id, function(err, user) {
		if (err) {
			res.redirect("/users/");
	} else {
		res.redirect("/users/" + req.params.id);
	}});
});




