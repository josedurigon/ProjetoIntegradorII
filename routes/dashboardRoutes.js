const express = require('express');
const fs = require('fs');
const router = express.Router();
const { TrainingSession } = require('../models'); // Ensure Visit is destructured if exported this way
const { Student } = require('../models');
const { getWeeklyHours, classifyStudents } = require('../processamento/processamentoAlunos'); 
const { Op } = require('sequelize');



router.get('/dashboard', function(req, res) {
    fs.readFile('./public/html/dashboard.html', function (err, html) {
        if (err) {
            throw err; 
        }      
        else { 
            if (!req.session.user) {
                return res.redirect('/login');
            }

            
            try{
                const userId = req.session.student.id;
                const studentHours = getWeeklyHours();

                const classifications = classifyStudents(studentHours);
                const userClassification = classifications[req.session.user.id];
                fs.readFile('../public/html/dashboard.html', 'utf8', (err, html) => {
                    if (err) {
                        console.error("Error reading HTML file:", err);
                        return res.status(500).send("Internal Server Error");
                    }
        
                    // Inject the user's statistics into the HTML before sending
                    html = html.replace("{{totalHours}}", userClassification.hours);
                    html = html.replace("{{classification}}", userClassification.classification);
        
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write(html);
                    res.end();
                });

            }catch (error){
                console.error('Error fetching training statistics:', error);
                res.status(500).send("Internal Server Error");
            }

    
        }
    });    
      

});



module.exports = router;
