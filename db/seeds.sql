USE employeetracker;

INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Salesperson', 80000, 1),
    ('Sales Lead', 100000, 1),
    ('Software Engineer', 120000, 2),
    ('Lead Engineer', 150000, 2),
    ('Accountant', 125000, 3),
    ('Lawyer', 190000, 4),
    ('Legal Team Lead', 250000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Woolf', 1, 2),
    ('Virginia', 'Gaveston', 2, NULL),
    ('Piers', 'LeRoi', 3, 4),
    ('Charles', 'Mansfield', 4, NULL),
    ('Katherine', 'Carrington', 5, NULL),
    ('Dora', 'Bellamy', 6, 7),
    ('Edward', 'Summers', 7, NULL);