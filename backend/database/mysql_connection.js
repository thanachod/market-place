require('dotenv').config();
const mysql = require('mysql');
// const mysql2 = require('mysql2/promise');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((error) => {
    if (error) {
        console.log("error:", error);
        return;
    }
    console.log("database is sucessfully connected.");
    
});


module.exports = db;