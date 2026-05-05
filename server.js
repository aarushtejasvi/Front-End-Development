const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "earth_foundation"
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("MySQL Connected");
    }
});
