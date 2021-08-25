const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const validateEntry = require('../../untis/validateEntry');

// Get all departments
router.get('/departments', (req, res)=>{
    const sql = `SELECT * FROM departments;`
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

// Get a single department
router.get('/department/:id', (req, res)=>{
    const sql = `SELECT * FROM departments WHERE id = ?`;
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

// Create a new dapartment
router.post('/department', ({ body }, res)=>{
    const errors = validateEntry(body, 'name');
    if (errors) {
        res.status(400).json({ errors: err.message });
        return;
    }

    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = [body.name];
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

// Delete a department
router.delete('/department/:id', (req, res)=>{
    const sql = `DELETE FROM departments WHERE id =?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result)=>{
        if (err) {
            res.status(400).json({ error: res.message });
        // checks if anything weas deleted, if not display message
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department now found'
            });
        } else {
            res.json({
                message: 'delete',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;