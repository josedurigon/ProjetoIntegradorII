const express = require('express');
var fs = require('fs');
const router = express.Router();
const { TrainingSession } = require('../models'); // Ensure Visit is destructured if exported this way
const { Student } = require('../models');


router.get('/dashboard', function(req, res) {
    fs.readFile('./public/html/dashboard.html', function (err, html) {
        if (err) {
            throw err; 
        }      
        else { 
           res.writeHeader(200, {"Content-Type": "text/html"});  
            res.write(html);  
            res.end();  
        }
    });    
      

});

// Check-out Route
router.post('/checkout', async (req, res) => {
   
    
});

module.exports = router;
