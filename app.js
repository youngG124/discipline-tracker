const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

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