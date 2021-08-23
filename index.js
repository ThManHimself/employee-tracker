const fs = require('fs');
const inquirer = require('inquirer');

// Questions array for user prompt
function appStart() {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'onAppStart',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', "Update an Employee's Role"]
        }
    ])
};

appStart();