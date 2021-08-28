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
        } else if (response.answer === 'Add a Department') {
            addDepartment();
        } else if (response.answer === 'Add a Role') {
            addRole();
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

function addDepartment() {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Department name: ',
        }
    ])
    .then(answer =>{
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        db.query(sql, answer.deptName, (err, res)=>{
            if (err) throw err;

            console.log(`Department created!`);
            getDepartments();
        });
    })
}

function addRole() {
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'Role name:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'New role salary:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Which department does this role belong to?(1 = Sales, 2 = Engineering, 3 = Finance, 4 = Legal)',
        }
    ])
    .then(answer=>{
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [answer.newRole, answer.salary, answer.departmentId];
        db.query(sql, params, (err, res)=>{
            if (err) throw err;

            console.log(`Role created!`);
            getRoles();
        });
    })
}