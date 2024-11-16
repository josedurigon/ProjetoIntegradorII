const express = require('express');
var fs = require('fs');
const router = express.Router();
const { TrainingSession } = require('../models'); // Ensure Visit is destructured if exported this way
const { Student } = require('../models');
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

// POST route to handle check-in
router.post('/checkin', async (req, res) => {
    const email = req.body.email; // Get email from form submission
    
    console.log(email);
    try {
        // Create a new entry in the Visits table with the current timestamp
    //findOne({ where: { email, password } });
        const student = await Student.findOne({where: {email:email}})
        if (!student) {
            return res.status(404).send('Student not found');
        }

        console.log("id student: ", student.id);
        
        const newVisit = await TrainingSession.create({
            student_id: student.id,   // Pass student.id as student_id
            date: new Date(),         // Current date
            entryTime: new Date(),    // Current timestamp for check-in
            exitTime: null,           // Set to null for check-in
            createdAt: new Date(),    // Optional: if your model auto-manages timestamps, you can omit createdAt
            updatedAt: new Date()     // Optional: if your model auto-manages timestamps, you can omit updatedAt
        });
        // Send a success message
        res.status(200).send('Check-in successful');
    } catch (error) {
        console.error('Error during check-in:', error);
        res.status(500).send('Failed to check in');
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
