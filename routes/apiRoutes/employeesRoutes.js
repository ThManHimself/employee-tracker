const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const validateEntry = require('../../utils/validateEntry');


// Get all employees
router.get('/employees', (req, res)=>{
    const sql = `
        SELECT employees.*, roles.title
        AS job_role
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id`;
    db.query(sql, (err, rows)=>{
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get a single employee
router.get('/employee/:id', (req, res)=>{
    const sql = `
        SELECT employees.* roles.title
        AS party_name
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id
        WHERE employees.id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row)=>{
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Create a new employee
router.post('/employee', ({ body }, res)=>{
    const errors = validateEntry(body, 'first_name', 'last_name', 'role_id', 'manager_id');
    if (errors) {
        res.status(400).json({ errors: errors });
        return;
    }
    
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    db.query(sql, params, (err, result)=>{
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Update an employees role
router.put('/employee/:id', (req, res)=>{

    const errors = validateEntry(req.body, 'role_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `
        UPDATE employees SET role_id = ?
        WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result)=>{
        if (err) {
            res.status(400).json({ error: err.message });
        // Checks if a record was found
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// Delete an employee from the database
router.delete('/employee/:id', (req, res)=>{
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result)=>{
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'employee deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


module.exports = router;