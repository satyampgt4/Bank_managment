module.exports = {
  addAccountPage: (req, res) => {
    if (req.session.auth) {
      if (req.session.user_type == "Admin" || req.session.user_type == "Manager") {
        let mas = req.session.message;
        req.session.message = "";
        res.render("add_account.ejs", {
          title: "Welcome to Panna Bank Add a new Account",
          user: req.session.user_name,
          type: req.session.user_type,
          account: req.session.acno,
          message: mas,
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
  addAccount: (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const balance = req.body.balance;
    const type = req.body.ac_type;

    let query = `INSERT INTO account (first_name, last_name, ac_type , balance)
       VALUES ('${first_name}' ,'${last_name}','${type}',${balance}) `;
    db.query(query, (err, result) => {
      if (err) {
        return res.status(200).send(err);
      }
      req.session.message = "Account Added Successfully";
      req.session.alert = "Success";
      res.redirect("/view_all");
    });
  },
  editAccountPage: (req, res) => {
    if (req.session.auth) {
      if (req.session.user_type == "Admin" || req.session.user_type == "Manager") {
        let mas = req.session.message;
        req.session.message = "";
        res.render("edit_account.ejs", {
          title: "Welcome to Panna Bank Add a new Account",
          message: mas,
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

  verifyEditAccountPage: (req, res) => {
    let acno = req.body.acno;
    let query = "SELECT * FROM account WHERE acno = " + acno + " ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length != 0) {
        res.render("verify_edit_account.ejs", {
          title: "Edit Account",
          accounts: result[0],
          message: "",
          user: req.session.user_name,
          type: req.session.user_type,
          account: req.session.acno
        });
      } else {
        req.session.message = "Account Not Found";
        req.session.alert = "Failed";
        res.redirect("/edit");
      }
    });
  },
  editAccount: (req, res) => {
    let message = "";
    let acno = req.body.acno;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let ac_type = req.body.ac_type;

    let query = `UPDATE account SET first_name = '${first_name}', last_name = '${last_name}',ac_type ='${ac_type}'
      WHERE acno = ${acno}`;

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      req.session.message = "Account Edited Successfully";
      req.session.alert = "Success";
      res.redirect("/view_all");
    });
  },
  deleteAccount: (req, res) => {
    let acno = req.body.acno;
    let deleteUserQuery = `DELETE FROM account WHERE acno = ${acno}`;

    db.query(deleteUserQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      req.session.message = "Account Deleted Successfully";
      req.session.alert = "Success";
      res.redirect("/view_all");
    });
  },
  showAccountPage: (req, res) => {
    let mas = req.session.message;
    req.session.message = "";
    res.render("getaccount.ejs", {
      title: "Welcome to Panna Bank Add a new Account",
      message: mas,
      alert: req.session.alert,
      user: req.session.user_name,
      type: req.session.user_type,
      account: req.session.acno
    });
  },
  showAccount: (req, res) => {
    let acno = req.body.acno;
    let query = "SELECT * FROM account WHERE acno = " + acno + " ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length != 0) {
        res.render("showaccount.ejs", {
          title: "Show Account",
          accounts: result[0],
          user: req.session.user_name,
          type: req.session.user_type,
          account: req.session.acno,
          message: "",
        });
      } else {
        req.session.message = "Account Not Found";
        req.session.alert = "Failed";
        res.redirect("/dashboard");
      }
    });
  },
  getViewAll: (req, res) => {
    if (req.session.auth) {
      if (req.session.user_type != "Personal") {
        let mas = req.session.message;
        req.session.message = "";
        let query = "SELECT * FROM account";
        db.query(query, (err, result) => {
          if (err) {
            res.redirect("/home");
          }
          res.render("view_all.ejs", {
            title: "Welcome to Panna Bank View Account",
            accounts: result,
            type: req.session.user_type,
            user: req.session.user_name,
            message: mas,
            alert: req.session.user_type,

          });
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
};
