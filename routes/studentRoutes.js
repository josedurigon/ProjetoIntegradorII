const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// Route to register a new student
//router.post('/register', studentController.registerStudent);

router.post('/register', (req, res) => {
    console.log('Register route hit'); // Debug statement
    // Rest of the code
});


module.exports = router;
