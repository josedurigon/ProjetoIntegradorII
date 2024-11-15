const express = require('express');
const session = require('express-session')
const router = express.Router();
const { Login } = require('../models'); // Import Login model from the models index

// Define the login route here
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query the database for the user
        const user = await Login.findOne({ where: { email, password } });
        if (!user) {

            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        session.Session.name = user
        res.redirect('/home')
        
//        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        // Log detailed error for server debugging
        console.error('Error during login attempt:', {
            message: error.message,
            stack: error.stack,
            input: { email, password },
        });

        // Respond with a structured JSON error message
        res.status(500).json({
            message: 'An internal server error occurred during login. Please try again later.',
            error: error.message,  // Optionally include this in development only
        });
    }
});

module.exports = router;
