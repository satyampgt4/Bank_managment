module.exports = {
  initilize: (req, res) => {

    let pq = `DROP table IF EXISTS account`;
    db.query(pq, (err, result) => {
      if (err) throw err;
    });
    pq = `DROP table IF EXISTS credantial`;
    db.query(pq, (err, result) => {
      if (err) throw err;
    });

    let query = `SHOW tables`;

    db.query(query, (err, result) => {
      if (result.length == 0) {
        let sql = `
    CREATE TABLE account(acno int AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    ac_type VARCHAR(100),
    balance int,
    PRIMARY KEY(acno)
    )`;

        db.query(sql, (err) => {
          if (err) throw err;
        });

        sql = `INSERT account  (acno, first_name,last_name,ac_type, balance)
        VALUES (200000,'Bank',"","Bank",10000000)`;

        db.query(sql, (err) => {
          if (err) throw err;
        });
        sql = `INSERT account  (first_name,last_name,ac_type, balance) 
        VALUES ?`;

        var values = [
          ["Vinay", "Singh", "Saving", 10000],
          ["Vishal", "Rajpoot", "Saving", 13250],
          ["Siddarth", "Sharma", "Saving", 2000],
          ["Rajesh", "Jain", "Saving", 35000],
          ["Nihsa", "Patidar", "Saving", 52300],
          ["Sandeep", "Kumar", "Saving", 1200],
          ["Gaurav", "Jain", "Saving", 21212],
          ["Deepali", "Soni", "Saving", 3241],
          ["Susmita", "Joshi", "Saving", 40232],
          ["Aditya", "Mahajan", "Saving", 9000],
          ["Harshimrat", "Kaur", "Saving", 7500],
          ["Rajan", "Gupta", "Saving", 6500],
          ["Ravi", "Bhalla", "Saving", 32100],
          ["Jasmin", "Bajaj", "Saving", 14500],
        ];

        db.query(sql, [values], function (err) {
          if (err) throw err;
        });
        sql = `
    CREATE TABLE credantial (
    user_name VARCHAR(100),
    user_type VARCHAR(100),
    password VARCHAR(100),
    acno int,
    PRIMARY KEY(user_name,user_type,acno)
    )`;
        db.query(sql, (err) => {
          if (err) throw err;
        });

        sql = `INSERT credantial  (user_name,user_type, password,acno) 
        VALUES ?`;

        var values = [
          ["Admin.a@0", "Admin", "sfhskd789", 0],
          ["Vishal.m@0", "Manager", "sfjldf7", 101],
          ["Abhinav.c@1", "Cashier", "sfjskldfj7", 1001],
          ["Rohit.c@2", "Cashier", "v,mncxvm", 1002],
          ["Rajesh.p@101", "Personal", "vsdkvmdsl", 200001],
          ["Vinay.p@102", "Personal", "fjisdfo", 200002],
          ["Vishal.p@103", "Personal", "fjksgh4", 200003],
          ["Siddarth.p@104", "Personal", "3845sdf", 200004],
          ["Rajesh.p@105", "Personal", "vjeko434", 200005],
          ["Nihsa.p@106", "Personal", "sjfksd8", 200006],
          ["Sandeep.p@107", "Personal", "kfl;sdkf9", 200007],
          ["Gaurav.p@108", "Personal", "sdjfl4", 200008],
          ["Deepali.p@109", "Personal", "sgdsf90s", 200009],
          ["Susmita.p@110", "Personal", "sdfkjlsd9", 200010],
          ["Aditya.p@111", "Personal", "sdfiosf", 200011],
          ["Harshimrat.p@112", "Personal", "sdfsf809", 200012],
          ["Rajan.p@113", "Personal", "sdf80sdf9", 200013],
          ["Ravi.p@114", "Personal", "dfsd87f", 200014],
          ["Jasmin.p@115", "Personal", "sdf80sd", 200015],
        ];

        db.query(sql, [values], function (err) {
          if (err) throw err;
        });
        res.redirect("/");
      } else {
        res.redirect("/");
      }
    });
  },
};
