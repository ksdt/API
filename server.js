require("dotenv").config();
const express = require("express");
const mongo = require(__dirname + "/server.js");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    console.log("Started listening at port " + process.env.PORT);
});
