const e = require("express");

module.exports = {
    transactionPage: (req, res) => {
        res.render("transaction_page.ejs", {
            title: "Welcome to Panna Bank Add a new Account",
            message: "",
            user: req.session.user_name,
            type: req.session.user_type,
            account: req.session.acno
        });
    },
    makeTransaction: (req, res) => {
        const acno = req.body.acno;
        const operation = req.body.operation;
        const amount = parseInt(req.body.amount);
        var balc = 0;
        var balb = 0;
        query = "SELECT * FROM account WHERE acno = 200000 ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(200).send(err);
            }
            balb = result[0].balance;
            query = "SELECT * FROM account WHERE acno = " + acno + " ";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(200).send(err);
                }
                balc = result[0].balance;
                if (operation == "Debit") {
                    if (amount <= balc) {
                        balb = balb + amount;
                        query = `UPDATE account SET balance = ${balb} WHERE acno =  ${200000} `;
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(200).send(err);
                            }
                        });
                        balc = balc - amount;
                        query = `UPDATE account SET balance = ${balc} WHERE acno =  ${acno} `;
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(200).send(err);

                            }
                            res.redirect("/dashboard");
                        });

                    } else {
                        console.log(balc);
                        console.log("Insufficent Balance")
                        res.redirect("/transaction")
                    }
                } else {
                    query = `UPDATE account SET balance = ${balb - amount} WHERE acno =  ${200000} `;
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(200).send(err);
                        }

                    });
                    query = `UPDATE account SET balance = ${balc + amount} WHERE acno =  ${acno} `;
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(200).send(err);
                        }
                        res.redirect("/dashboard");
                    });

                }
            });
        });



    },

    fundTransferPage: (req, res) => {
        res.render("fund_transfer_page.ejs", {
            title: "Welcome to Panna Bank Add a new Account",
            message: "",
            user: req.session.user_name,
            type: req.session.user_type,
            account: req.session.acno
        });
    },
    transferFund: (req, res) => {
        const acnof = req.body.acnof;
        const acnot = req.body.acnot;
        const amount = parseInt(req.body.amount);

        var balf = 0;
        var balt = 0;
        query = "SELECT * FROM account WHERE acno = " + acnof + " ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(200).send(err);
            }
            balf = result[0].balance;
            query = "SELECT * FROM account WHERE acno = " + acnot + " ";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(200).send(err);
                }
                balt = result[0].balance;
                if (amount <= balf) {
                    query = `UPDATE account SET balance = ${balf - amount} WHERE acno =  ${acnof} `;
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(200).send(err);
                        }
                    });
                    query = `UPDATE account SET balance = ${balt + amount} WHERE acno =  ${acnot} `;
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(200).send(err);
                        }
                        res.redirect("/dashboard");
                    });

                } else {
                    console.log(balf);
                    console.log("Insufficent Balance")
                    res.redirect("/fundtransfer")
                }
            });
        });



    },
};
