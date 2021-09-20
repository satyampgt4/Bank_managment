const express = require("express");
const path = require("path");
const app = require("./router");
const db = require("./database");
const port = 5000;
global.db = db;

// configure middleware
app.set("port", process.env.port || port); // set express to use this port
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
