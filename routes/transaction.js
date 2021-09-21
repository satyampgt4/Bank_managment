module.exports = {
    transactionPage: (req, res) => {
        if (req.session.auth) {
            if (req.session.user_type == "Admin" || req.session.user_type == "Cashier") {
                let mas = req.session.message;
                req.session.message = "";
                res.render("transaction_page.ejs", {
                    title: "Welcome to Panna Bank Add a new Account",
                    message: mas,
                    alert: req.session.alert,
                    user: req.session.user_name,
                    type: req.session.user_type,
                    account: req.session.acno
                });
            } else {
                req.session.message = "You are not Authorised ";
                req.session.alert = "Failed";
                res.redirect("/dashboard");
            }
        } else {
            req.session.message = "You are not Logged IN ";
            req.session.alert = "Failed";
            res.redirect("/");
        }
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
                if (result.length != 0) {
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
                                req.session.message = ` Rs.${amount} is Successfully Debit to ${balc}`;
                                req.session.alert = "Success";
                                res.redirect("/dashboard");
                            });

                        } else {
                            req.session.message = "Insufficent Balance";
                            req.session.alert = "Failed";
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
                            req.session.message = ` Rs.${amount} is Successfully Credit to ${balc}`;
                            req.session.alert = "Success";
                            res.redirect("/dashboard");
                        });

                    }
                } else {
                    req.session.message = "Account Not Found";
                    req.session.alert = "Failed";
                    res.redirect("/transaction");
                }
            });
        });
    },

    fundTransferPage: (req, res) => {
        if (req.session.auth) {
            let mas = req.session.message;
            req.session.message = "";
            res.render("fund_transfer_page.ejs", {
                title: "Welcome to Panna Bank Add a new Account",
                message: mas,
                alert: req.session.alert,
                user: req.session.user_name,
                type: req.session.user_type,
                account: req.session.acno
            });
        } else {
            req.session.message = "You are not Logged IN ";
            req.session.alert = "Failed";
            res.redirect("/");
        }
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
            if (result.length != 0) {
                balf = result[0].balance;
                query = "SELECT * FROM account WHERE acno = " + acnot + " ";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(200).send(err);
                    }
                    if (result.length != 0) {
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
                                req.session.message = ` Rs.${amount} is Successfully  Transfred to ${acnot}`;
                                req.session.alert = "Success";
                                res.redirect("/dashboard");
                            });

                        } else {
                            req.session.message = "Insufficent Balance";
                            req.session.alert = "Failed";
                            res.redirect("/fundtransfer")
                        }
                    } else {
                        req.session.message = "Account Not Found";
                        req.session.alert = "Failed";
                        res.redirect("/fundtransfer");
                    }
                });
            } else {
                req.session.message = "Account Not Found";
                req.session.alert = "Failed";
                res.redirect("/fundtransfer");
            }
        });
    },
};
