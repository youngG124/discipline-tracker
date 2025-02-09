const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'172.17.0.4',
    user:'root',
    password:'7536',
    database:'disciplinetracker'
});

db.connect(err => {
    if(err) {
        console.error('Could not connect to mysql : ', err)
        return;
    }
    console.log('Connected to MySql');
});

// Insert API
app.post("/insert", (req, res) => {
    console.log('req.body : ', req.body);
    const { discipline, text } = req.body;

    // Validate inputs
    if (!discipline || !text) {
        return res.status(400).json({ error: "discipline and text are required" });
    }

    // Prevent SQL injection by allowing only alphanumeric table names
    if (!/^[a-zA-Z0-9_]+$/.test(discipline)) {
        return res.status(400).json({ error: "Invalid table name" });
    }

    // Check if the table exists
    const checkTableQuery = `SHOW TABLES LIKE ?`;
    db.query(checkTableQuery, [discipline], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(400).json({ error: `Table '${discipline}' does not exist` });
        }

        // Insert text into the specified table
        const insertQuery = `INSERT INTO ?? (text) VALUES (?)`;
        db.query(insertQuery, [discipline, text], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "Data inserted", id: result.insertId });
        });
    });
});

app.get('/discipline', (req, res) => {
    db.query('SELECT * FROM discipline_run;', (err, results) => {
        if(err) {
            res.status(500).send('Database query error, error : ', err);
            console.log('error : ', err);
            return;
        }
        res.json(results);
    });
});

app.get('/', (req, res) => {
    res.send('쮜이이...');
});

app.get('/1', (req, res) => {
    res.send('듀...');
});

// Sample API Routes
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ]);
});

app.post('/api/echo', (req, res) => {
    res.json({ received: req.body });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});