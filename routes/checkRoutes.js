const express = require('express');
var fs = require('fs');
const router = express.Router();
const Visit = require('../models/trainingsession'); // Import Visit model
const { Op } = require('sequelize');


router.get('/', function(req, res) {
    fs.readFile('./public/html/checkin.html', function (err, html) {
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

// Check-in Route
router.post('/checkin', async (req, res) => {
    const userId = req.body.userId; 
    try {
        // Create a new Visit record with check-in time
        const newVisit = await Visit.create({
            userId,
            checkIn: new Date(), // Current datetime
            checkOut: null,
        });

        res.status(200).json({ message: 'Check-in successful', visit: newVisit });
    } catch (error) {
        console.error('Error during check-in:', error);
        res.status(500).json({ message: 'Error during check-in', error: error.message });
    }
});

// Check-out Route
router.post('/checkout', async (req, res) => {
    const userId = req.body.userId; // Assuming userId is sent in the request body

    try {
        // Find the latest Visit record with a null checkOut field for the user
        const visit = await Visit.findOne({
            where: {
                userId,
                checkOut: { [Op.is]: null } // Only find open visits
            },
            order: [['checkIn', 'DESC']],
        });

        if (!visit) {
            return res.status(400).json({ message: 'No active check-in found for checkout' });
        }

        // Update the record with the current check-out time
        visit.checkOut = new Date(); // Current datetime
        await visit.save();

        res.status(200).json({ message: 'Check-out successful', visit });
    } catch (error) {
        console.error('Error during check-out:', error);
        res.status(500).json({ message: 'Error during check-out', error: error.message });
    }
});

module.exports = router;
