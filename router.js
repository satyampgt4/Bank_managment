const express = require("express");
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse form data client
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const { } = require("./routes/admin");
const { initilize } = require("./routes/initilize");
const {
    getLoginPage,
    authUser,
    getDashboardPage,
    logOut
} = require("./routes/login_feature");
const {
    addAccountPage,
    addAccount,
    deleteAccount,
    editAccount,
    editAccountPage,
    verifyEditAccountPage,
    showAccountPage,
    showAccount,
    getViewAll
} = require("./routes/user");
const {
    transactionPage,
    fundTransferPage,
    makeTransaction,
    transferFund
} = require("./routes/transaction");

// routes for the app
//GET

app.get("/", getLoginPage);
app.get("/dashboard", getDashboardPage);
app.get("/view_all", getViewAll);
app.get("/init", initilize);
app.get("/add", addAccountPage);
app.get("/edit", editAccountPage);
app.get("/view", showAccountPage);
// app.get("/delete/", deleteAccount);
app.get("/logout/", logOut);
app.get("/transaction", transactionPage);
app.get("/fundtransfer", fundTransferPage);
//POST
app.post("/", authUser);
app.post("/add", addAccount);
app.post("/edit", verifyEditAccountPage);
app.post("/verifyEdit", editAccount);
app.post("/view", showAccount);
app.post("/delete/", deleteAccount);
app.post("/transaction/", makeTransaction);
app.post("/fundtransfer/", transferFund);


module.exports = app;