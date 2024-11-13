const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
const login = require('../models/login');


// Route to handle form submission (POST request from the form)
router.post('/save-student', studentController.registerStudent);

    

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request

    try {
        // Query database for a user with matching email and password
        const user = await login.findOne({ where: { email, password } });
        
        if (!user) {
            // If user is not found, send an error response
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If credentials are correct, send a success message
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
