const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "mysqlroot",

  database: 'customer',

});

db.connect((err) => {

  if (err) {

    throw err;

  }

  console.log("MySql Connected");

});

const app = express();

app.get("/createdb", (req, res) => {

  let sql = "CREATE DATABASE customer";

  db.query(sql, (err) => {

    if (err) {

      throw err;

    }
    res.send("Database created");

  });

});


app.get("/createtable", (req, res) => {

  let sql = "CREATE TABLE account(acno int AUTO_INCREMENT, name VARCHAR(100), balance int, PRIMARY KEY(acno))"

  db.query(sql, (err) => {

    if (err) {

      throw err;

    }

    res.send("Table created");

  });

});

app.listen('3000',()=>{
  console.log('Server Started');
})