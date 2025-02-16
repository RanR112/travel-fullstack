require("dotenv").config();

const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Koneksi database gagal:", err);
        return;
    }
    console.log("Terhubung ke database.");
});

module.exports = db;
