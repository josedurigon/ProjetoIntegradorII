const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// // Route to register a new student
// //router.post('/register', studentController.registerStudent);

// // router.post('/register', (req, res) => {
// //     console.log('Register route hit'); // Debug statement
// //     // Rest of the code
// // });

// router.post('/register', studentController.registerStudent);


// module.exports = router;


// Route to handle form submission (POST request from the form)
router.post('/save-student', studentController.registerStudent);

module.exports = router;
