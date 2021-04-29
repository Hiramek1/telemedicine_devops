require("dotenv").config();
const express = require("express");
const cors = require('cors');
const userRouter = require("./users/user.router");


const app = express();

app.use(cors());  
app.use(express.json());
app.use("/api/users", userRouter);


const mysql = require('mysql');
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD
});


// Create database and table if not exists.
con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
  con.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DB}\``, function (err, result) {
    if (err) throw err;
    // console.log("Database created");

    con.query(`CREATE TABLE IF NOT EXISTS \`${process.env.MYSQL_DB}\`.\`users\` (` +
      "`id` int NOT NULL AUTO_INCREMENT," +
      "`firstname` varchar(45) NOT NULL," +
      "`lastname` varchar(45) DEFAULT NULL," +
      "`email` varchar(45) NOT NULL," +
      "`password` varchar(100) NOT NULL," +
      "PRIMARY KEY (`id`))", function (err, result) {
        if (err) throw err;
        // console.log("Table created");
      });

  });
});

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});







