const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'BlueDog432',
    database: 'employeetracker'
});

module.exports = db;