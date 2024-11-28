const express = require('express');
var fs = require('fs');
const router = express.Router();
const { TrainingSession } = require('../models'); // Ensure Visit is destructured if exported this way
const { Student } = require('../models');
const { Op } = require('sequelize');


router.get('/', function(req, res) {
    fs.readFile('./public/html/checkout.html', function (err, html) {
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
    const email = req.body.email; // Get email from form submission
    
    console.log(email);
    try {
        // Create a new entry in the Visits table with the current timestamp

        
        const student = await Student.findOne({where: {email:email}})
        if (!student) {
            return res.status(404).send('Student not found');
        }

        const checkout = await TrainingSession.findOne({
            where: {student_id: student.id, 
                exitTime: { [Op.is]: null } 
            }
        })
        console.log("ow olha aqui doidao", checkout)

        console.log("id student: ", student.id);
        
        if(checkout == null){
            res.send(`
                <script>
                    alert("Checkout already registered");
                    window.location.href = "/home"; // Redirect or stay on the same page
                </script>
            `);
            return;
        }

        const newVisit = await TrainingSession.update(
            {exitTime: new Date()},
            {where  : {student_id: student.id}}   // Pass student.id as student_id
            
        );
        // Send a success message
        console.log(__dirname)
        const success= true;
        
        if (success == true){
            res.send(`
                <script>
                    alert("Operation successful!");
                    window.location.href = "/home"; 
                </script>
            `);
        }
        else{
            res.send(`
                <script>
                    alert("Operation failed.");
                    window.location.href = "/home"; // Redirect or stay on the same page
                </script>
            `);
        }
    } catch (error) {
        console.error('Error during check-in:', error);
        res.status(500).send('Failed to check in');
    }
});

module.exports = router;
