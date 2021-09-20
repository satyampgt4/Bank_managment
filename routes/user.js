module.exports = {
  addAccountPage: (req, res) => {
    res.render("add_account.ejs", {
      title: "Welcome to Panna Bank Add a new Account",
      message: "",
      user: req.session.user_name,
      type: req.session.user_type,
      account: req.session.acno
    });
  },
  addAccount: (req, res) => {
    const message = "";
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
      res.redirect("/home");
    });
  },
  editAccountPage: (req, res) => {

    res.render("edit_account.ejs", {
      title: "Welcome to Panna Bank Add a new Account",
      message: "",
      user: req.session.user_name,
      type: req.session.user_type,
      account: req.session.acno
    });
  },

  verifyEditAccountPage: (req, res) => {
    let acno = req.body.acno;
    let query = "SELECT * FROM account WHERE acno = " + acno + " ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("verify_edit_account.ejs", {
        title: "Edit Account",
        accounts: result[0],
        message: "",
        user: req.session.user_name,
        type: req.session.user_type,
        account: req.session.acno
      });
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
      res.redirect("/view_all");
    });
  },
  showAccountPage: (req, res) => {
    res.render("getaccount.ejs", {
      title: "Welcome to Panna Bank Add a new Account",
      message: "",
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
      res.render("showaccount.ejs", {
        title: "Show Account",
        accounts: result[0],
        message: "",
        user: req.session.user_name,
        type: req.session.user_type,
        account: req.session.acno
      });
    });
  },
  getViewAll: (req, res) => {
    let query = "SELECT * FROM account";

    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/home");
      }
      let user_name = "Guest";
      let accno = 000;
      if (req.session.auth) {
        user_name = req.session.user_name;
      }
      res.render("admin.ejs", {
        title: "Welcome to Panna Bank View Account",
        accounts: result,
        type: req.session.user_type,
        user: user_name,
        account: accno
      });
    });
  },
};
