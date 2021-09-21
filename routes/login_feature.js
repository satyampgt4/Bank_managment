module.exports = {

  getLoginPage: (req, res) => {
    let query = `SHOW tables`;
    db.query(query, (err, result) => {
      if (result.length < 2) {
        res.redirect("/init");

      } else {
        let mas = req.session.message;
        let use = "Guest"
        req.session.message = "";
        if (req.session.auth) {
          use = req.session.user_name;
        }
        res.render("login.ejs", {
          title: "Welcome to Panna Bank View Account",
          user: use,
          message: mas,
          alert: req.session.alert,
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
          req.session.message = "Incorrect Password";
          req.session.alert = "Failed";
          res.redirect("/");
        }

      } else {
        req.session.message = "Incorrect User Name or User Type ";
        req.session.alert = "Failed";
        res.redirect("/");
      }
    });
  },
  getDashboardPage: (req, res) => {
    if (req.session.auth) {
      let user_type = req.session.user_type;
      let mas = req.session.message;
      req.session.message = "";
      if (user_type == "Admin") {
        res.render("admin_dashboard.ejs", {
          title: "Welcome to Panna Bank View Account",
          user: req.session.user_name,
          type: user_type,
          account: req.session.acno,
          message: mas,
          alert: req.session.alert,
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
          account: req.session.acno,
          message: mas,
          alert: req.session.alert,
        });
      } else {
        res.render("customer_dashboard.ejs", {
          title: "Welcome to Panna Bank View Account",
          user: req.session.user_name,
          type: user_type,
          account: req.session.acno,
          message: mas,
          alert: req.session.alert,
        });
      }
    }

    else {
      req.session.message = "You are not Loged IN";
      req.session.alert = "Failed";
      res.redirect("/");
    };
  },
  logOut: (req, res) => {
    req.session.auth = false;
    req.session.user_name = "Guest";
    req.session.user_type = "";
    req.session.message = "You are Loged out Successfully";
    req.session.alert = "Success";
    res.redirect("/");
  }
};
