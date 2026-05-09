const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "22@12@2006Ani",
    database: "earth_foundation"
});

db.connect((err) => {

    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MySQL");
    }

});

// SERVE HTML FILE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "RegisForm.html"));
});

// REGISTER API
app.post("/register", (req, res) => {

    console.log(req.body);

    const {
        name,
        phone,
        aadhar,
        address,
        email,
        gender
    } = req.body;

    const sql = `
        INSERT INTO volunteers
        (name, phone, aadhar, address, email, gender)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, phone, aadhar, address, email, gender],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("Database Error");
            } else {
                res.send("Data Saved Successfully");
            }

        }
    );

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.post("/api/signup", (req, res) => {

    const {
        name,
        email,
        phone,
        address,
        dob,
        password
    } = req.body;

    const sql = `
        INSERT INTO users
        (name, email, phone, address, dob, password)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, phone, address, dob, password],
        (err, result) => {

            if (err) {

                console.log(err);
                res.json({ message: "Database error" });

            } else {

                res.json({ message: "Signup successful" });

            }

        }
    );

});
