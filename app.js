// DECIDE WHAT TO DO WITH EVERYTHING BELOW

const { validate, EXPORTDECLARATION_TYPES } = require('@babel/types');
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { exit } = require('yargs');

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
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', "Update an Employee's Role", 'exit']
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
        } else if (response.answer === 'Add an Employee') {
            addEmployee();
        } else if (response.answer === "Update an Employee's Role") {
            updateEmployee();
        }
        // else {
        //     break;
        // }
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

function addEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'First name:',
            validate: firstNameCheck =>{
                if (firstNameCheck) {
                    return true;
                } else {
                    console.log("Please enter the employee's first name!");
                    return false;
                }
            },
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Last name:',
            validate: lastNameCheck =>{
                if (lastNameCheck) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name!");
                    return false;
                }
            },
        },
        {
            type: 'number',
            name: 'role_id',
            message: "What is this employee's job?(1 = Salesperson, 2 = Sales Lead, 3 = Software Engineer, 4 = Lead Engineer, 5 = Accountant, 6 = Lawyer, 7 = Legal Team Lead",
            validate: roleCheck=>{
                if (roleCheck) {
                    return true;
                } else {
                    console.log(`Please enter the employee's job role!`);
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'managerCheck',
            message: 'If this employee has a manager, what job role is their manager?(0 = no manager, 2 = Sales Lead, 4 = Lead Engineer, 7 = Leagal Team Lead)',
            validate: ManagerCheck=>{
                if (!ManagerCheck) {
                    console.log(`Please enter a valid entry`);
                    return false;
                } else if (ManagerCheck === 0) {
                    return null;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(answer=>{
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.managerCheck];
        db.query(sql, params, (err, res)=>{
            if (err) throw err;

            console.log(`Employee Added!`);
            getEmployees();
        })
    })
}

function updateEmployee(){
    let employeesArray;
    let rolesArray;
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeToUpdate',
            message: 'Which employee would you like to update?',
            choices: employeesArray
        },
        {
            type: 'list',
            name: 'updatedRole',
            message: 'What is their new role?',
            choices: rolesArray
        }
    ])
    .then(answer =>{
        const sql = `UPDATE employees
            SET `
    })
}

// function updateEmployee() {
//     let sql = `
//         SELECT employees.id, employees.first_name, employees.last_name, role_id AS "role_id"
//         FROM employees, roles, departments
//         WHERE departments.id = roles.department_id AND roles.id = employees.role_id
//         `;
//     db.query(sql, (err, res)=>{
//         if (err) throw err;
//         let employeesArray = [];
//         let rolesArray = [];
//         res.forEach((employee) => {
//             employeesArray.push(`${employee.first_name} ${employee.last_name}`);
//         });

//         let sql = `SELECT roles.id, roles.title FROM roles`;
//         db.query(sql, (err, res)=>{
//             if (err) throw err;
//             res.forEach((role) =>{
//                 rolesArray.push(role.title);
//             });
//         });

//         inquirer.prompt([
            // {
            //     type: 'list',
            //     name: 'employeeToUpdate',
            //     message: 'Which employee would you like to update?',
            //     choices: employeesArray
            // },
            // {
            //     type: 'list',
            //     name: 'updatedRole',
            //     message: 'What is their new role?',
            //     choices: rolesArray
            // }
//         ])
//         .then((answer)=>{
//             makeChanges(answer);
//         });
//     })
// }

// function makeChanges() {
//     let updatedTitleId;
//     let employeeId;
    
//     res.forEach((role)=>{
//         if (answer.updatedRole === role.title) {
//             updatedTitleId = role.id;
//         }
//     });
    
//     res.forEach((employee)=>{
//         if (answer.employeeToUpdate === `${employee.first_name} ${employee.last_name}`) {
//             employeeId = employee.id;
//         }
//     });
    
//     let sql = `
//     UPDATE employees
//     SET employees.role_id = ?
//     WHERE employees.id = ?
//     `;
//     db.query(sql, [updatedTitleId, employeeId], (err)=>{
//         if(err) throw err;
//         console.log(`Employee Role Updated!`);
//         appStart();
//     });
// }

// function exit() {
//     break;
// }