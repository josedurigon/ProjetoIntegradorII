const express = require('express');
var fs = require('fs');
const router = express.Router();
const { TrainingSession } = require('../models'); // Ensure Visit is destructured if exported this way
const { Student } = require('../models');
const { Op } = require('sequelize');

let erroCheckinDuplo = false;


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
    var email = req.body.email; // Get email from form submission
    
    console.log(email);
    try {
        // Create a new entry in the Visits table with the current timestamp
    //findOne({ where: { email, password } });
        // const today = new Date().toISOString().split('T')[0]; // e.g., '2024-11-16'
        const today = new Date().toLocaleString('en-CA', { timeZone: 'America/Sao_Paulo' });
        const todayDateString = today.split(',')[0]; // Extracts just the date part as 'YYYY-MM-DD'
        
        console.log(todayDateString); // Should output 'YYYY-MM-DD' in Brazilian local time

                    const student = await Student.findOne({where: {email:email}})

        const treino = await TrainingSession.findOne({
            where: {student_id: student.id, createdAt: {
                [Op.eq]: todayDateString
            }}
        })

        console.log("treino -> ", treino)
        console.log(today)
        if (treino != null){
            console.log("nao pode fazer checkin duas vezes no dia")
            erroCheckinDuplo = true;
            throw new Error("You can't make a checkin in two times a day!!!")
        }

        console.log("\n\n\n======treino: ",treino)

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
                    window.location.href = "/home"; 
                </script>
            `);
        }
        // Send a success message
        // res.status(200).send('Check-in successful');
    } catch (error) {
        console.error('Error during check-in:', error);
        if (erroCheckinDuplo == true){
            res.send(`
                <script>
                    alert("Can't make duple checking in a day");
                    window.location.href = "/home"; 
                </script>
            `);
        }
    }
});

// Check-out Route
// router.post('/checkout', async (req, res) => {
//     const email = req.body.email; // Get email from form submission
    
//     console.log(email);
//     try {
//         // Create a new entry in the Visits table with the current timestamp
//     //findOne({ where: { email, password } });
//         const student = await Student.findOne({where: {email:email}})
//         if (!student) {
//             return res.status(404).send('Student not found');
//         }

//         console.log("id student: ", student.id);
        
//         const newVisit = await TrainingSession.update(
//             {exitTime: new Date()},
//             {where  : {student_id: student.id}}   // Pass student.id as student_id
            
//         );
//         // Send a success message
//         res.status(200).send('Check-in successful');
//     } catch (error) {
//         console.error('Error during check-in:', error);
//         res.status(500).send('Failed to check in');
//     }
// });

module.exports = router;
