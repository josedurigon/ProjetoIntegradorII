const express = require('express');
const router = express.Router();
const testController = require('../controller/testController');

// Define test routes
router.get('/get', testController.getTest);   // GET request
router.post('/post', testController.postTest); // POST request

module.exports = router;
