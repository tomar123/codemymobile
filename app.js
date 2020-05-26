const express = require("express");
var cors = require('cors')
const morgan = require("morgan");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const app = express();

// To show Server logs
app.use(morgan("short"));

const whitelist = ['http://localhost:4200'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    // !origin check for same origin
    console.log(origin)
    if(!origin || whitelist.includes(origin))
      return callback(null, true)
      callback(new Error('Not allowed by CORS'));
  }
}
 
app.use(cors(corsOptions));

// To get data from HTML form
app.use(bodyparser.urlencoded({ extended: false }));

// localhost:3003
app.listen(3003, () => {
    console.log("server is up and listening on 3003 .....");
});

// To host the files located in public folder
app.use(express.static("./public"));

// Create Database connection
function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Database@123",
        database: "lbta_mysql"
    });
}

// 1st API Endpoint (To fetch users data)
app.get("/users", (req, res) => {
    const queryString = "SELECT * FROM users";
    getConnection().query(queryString, (err, rows, field) => {
        if (err) {
            console.log("there is some problem in fetching the information of user table", err);
            res.sendStatus(500);
            return;
        }
        if (rows.length > 0) {
            console.log("Information fetched successfully of all users ");
            res.json(rows);
        } else {
            console.log("no user found saved in table");
            res.send();
            return;
        }
    })
});

// 2nd API Endpoint (To fetch user's friends data)
app.get("/usersfriends", (req, res) => {
    const queryString = "SELECT u.id, uf.user_id, u.first_name, (select first_name from users as u1 where u1.id = uf.user_friend_id) as friend FROM lbta_mysql.users as u inner join  user_friends as uf on u.id=uf.user_id";
    getConnection().query(queryString, (err, rows, field) => {
        if (err) {
            console.log("there is some problem in fetching the information of user table", err);
            res.sendStatus(500);
            return;
        }
        if (rows.length > 0) {
            console.log("Information fetched successfully of all users ");
            res.json(rows);
        } else {
            console.log("no user found saved in table");
            res.send();
            return;
        }
    })
});

// 3rd API Endpoint (To fetch user's friends of friends data)
app.get("/usersfriendsOFfriends", (req, res) => {
    const queryString = "";
    getConnection().query(queryString, (err, rows, field) => {
        if (err) {
            console.log("there is some problem in fetching the information of user table", err);
            res.sendStatus(500);
            return;
        }
        if (rows.length > 0) {
            console.log("Information fetched successfully of all users ");
            res.json(rows);
        } else {
            console.log("no user found saved in table");
            res.send();
            return;
        }
    })
});