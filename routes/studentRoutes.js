const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// Route to register a new student
router.post('/register', studentController.registerStudent);

module.exports = router;
