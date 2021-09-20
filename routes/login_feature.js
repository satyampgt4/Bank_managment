module.exports = {

  getLoginPage: (req, res) => {
    let query = `SHOW tables`;
    db.query(query, (err, result) => {
      if (result.length == 0) {
        res.redirect("/init");
      } else {
        let user_name = "Guest";

        res.render("login.ejs", {
          title: "Welcome to Panna Bank View Account",
          user: user_name,
          type: req.session.user_type,
          account: req.session.acno
        });
      }
    });
  },
  authUser: (req, res) => {
    const user_name = req.body.user_name;
    const user_type = req.body.user_type;

    let query = `SELECT * FROM credantial WHERE user_name = '${user_name}' AND user_type = '${user_type}' `;
    db.query(query, (err, result) => {
      if (err) {
        return res.status(200).send(err);
      }
      if (result.length > 0) {
        if (JSON.stringify(result[0].password) == JSON.stringify(req.body.password)) {

          req.session.auth = true;
          req.session.user_name = user_name;
          req.session.user_type = user_type;
          req.session.acno = result[0].acno;
          console.log(result[0]);
          res.redirect("/dashboard")
        } else {
          console.log("Incorrect Password");
          res.end();
        }
      } else {
        console.log("Incorrect User Name");
        res.end();
      }
    });
  },
  getDashboardPage: (req, res) => {
    if (req.session.auth) {
      let user_type = req.session.user_type;
      if (user_type == "Admin") {
        res.render("admin_dashboard.ejs", {
          title: "Welcome to Panna Bank View Account",
          user: req.session.user_name,
          type: user_type,
          account: req.session.acno
        });
      } else if (user_type == "Manager") {
        res.render("manager_dashboard.ejs", {
          title: "Welcome to Panna Bank View Account",
          user: req.session.user_name,
          type: user_type,
          account: req.session.acno
        });
      } else if (user_type == "Cashier") {
        res.render("cashier_dashboard.ejs", {
          title: "Welcome to Panna Bank View Account",
          user: req.session.user_name,
          type: user_type,
          account: req.session.acno
        });
      } else {
        res.render("customer_dashboard.ejs", {
          title: "Welcome to Panna Bank View Account",
          user: req.session.user_name,
          type: user_type,
          account: req.session.acno
        });
      }
    }

    else {
      console.log("You are not Loged IN");
      res.end();
    };
  },
  logOut: (req, res) => {
    req.session.auth = false;
    req.session.user_name = "Guest";
    req.session.user_type = "";
    req.session.acno = 0;
    res.redirect("/");
  }
};
