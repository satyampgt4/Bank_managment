const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",

//   user: "bankproject",

//   password: "dgajrJ9Lil6",

//   database: "sql6435536",
// });

const db = mysql.createConnection({
  host: "db4free.net",

  user: "sql6435536",

  password: "dgajrJ9Lil6",

  database: "sql6435536",
});

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

db.connect((err) => {
  if (err) throw err;

  console.log("MySql Connected");
});
module.exports = db;
