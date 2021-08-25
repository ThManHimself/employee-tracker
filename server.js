const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
// const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api'. apiRoutes);



// Default response for any other request (Not Found)
app.use((req, res)=>{
    res.status(404).end();
});

// Start server after DB connection
db.connect(err =>{
    if (err) throw err;
    console.log(`Database connected.`);
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });
});

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'BlueDog432',
//         database: 'employeetracker'
//     },
//     console.log(`Connected to the Employee Tracker database.`)
// );

