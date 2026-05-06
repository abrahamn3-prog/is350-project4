const express = require('express');
const cors = require('cors'); 
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

// --- UPDATED DATA: Sending Users instead of Posts ---
let users = [
    { 
        id: 1, 
        name: 'John Doe', 
        email: 'grading@express.com',
        address: { city: 'Node City' },
        phone: '1-800-555-0000',
        company: { name: 'Express University' }
    },
    { 
        id: 2, 
        name: 'Jane Doe', 
        email: 'live@render.com',
        address: { city: 'Cloud Town' },
        phone: '1-800-555-9999',
        company: { name: 'Render Tech' }
    }
];

app.get('/api/items', (req, res) => {
    res.json(users);
});

app.post('/api/items', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name || 'New User',
        email: req.body.email || 'new@user.com',
        address: { city: req.body.city || 'Unknown City' }
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});