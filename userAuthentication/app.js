// app.js
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// In-memory "database" (for demonstration purposes)
const users = [];

// Registration route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user (in this case, to the in-memory array)
    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
