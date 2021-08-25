// DECIDE WHAT TO DO WITH EVERYTHING BELOW

const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'BlueDog432',
    database: 'employeetracker'
})

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database.");
    appStart();
});

// Questions array for user prompt
function appStart() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'answer',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', "Update an Employee's Role"]
        }
    ])
    .then(response =>{
        if (response.answer === 'View All Departments') {
            getDepartments();
        } else if (response.answer === 'View All Roles') {
            getRoles();
        } else if (response.answer === 'View All Employees') {
            getEmployees();
        }
    })
};

function getDepartments() {
    db.query(
        'SELECT * FROM departments;', (err, rows)=>{
            if (err) {
                console.log(err.message);
            } else {
                console.table(rows);
            }
        }
    );
    appStart();
}

function getRoles() {
    db.query(
        `SELECT * FROM roles;`, (err, rows)=>{
            if (err) {
                console.log(err.message);
            } else {
                console.table(rows);
            }
        }
    );
    appStart();
}

function getEmployees() {
    db.query(
        `SELECT * FROM employees;`, (err, rows)=>{
            if (err) {
                console.log(err.message);
            } else {
                console.table(rows);
            }
        }
    );
    appStart();
}