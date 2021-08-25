const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'BlueDog432',
    database: 'employeetracker'
    },
    console.log(`Connected to the Employee Tracker database.`)
);

module.exports = db;