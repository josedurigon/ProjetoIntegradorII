
const express = require('express');
const fs = require('fs');
const path = require('path'); // Use `path` for handling file paths
const router = express.Router();
const { TrainingSession } = require('../models');
const { Student } = require('../models');


router.get('/dashboard', async function (req, res) {
    // Redirect if not logged in
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        // Fetch all training sessions
        
        console.log("=======================", req.session.user)
        console.log("=======================", req.session.student)

        //req.session.student
//req.session.user

        const sessions = await TrainingSession.findAll();
        console.log(sessions);

        // Extract unique student IDs from sessions
        const studentIds = [...new Set(sessions.map(session => session.student_id))];
        console.log(studentIds);

        // Read the dashboard HTML file only once
        const dashboardPath = path.join(__dirname, '../public/html/dashboard.html');
        fs.readFile(dashboardPath, 'utf8', (err, html) => {
            if (err) {
                console.error("Error reading HTML file:", err);
                return res.status(500).send("Internal Server Error");
            }

            html = html.replace("{{totalSessions}}", sessions.length); // Inject total sessions as a simple example


            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(html);
            res.end();
        });

    } catch (error) {
        console.error('Error fetching training statistics:', error);
        res.status(500).send("Internal Server Error");
    }
});




module.exports = router;
