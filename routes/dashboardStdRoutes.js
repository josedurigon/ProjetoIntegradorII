
const express = require('express');
const fs = require('fs');
const path = require('path'); // Use `path` for handling file paths
const router = express.Router();
const { TrainingSession } = require('../models');
const { Student } = require('../models');
const { table } = require('console');


router.get('/dashboardStd', async function (req, res) {
    // Redirect if not logged in
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        // Fetch all training sessions
        
        console.log("=======================", req.session.user)
        console.log("=======================", req.session.student)






        const progressData = await TrainingSession.sequelize.query(
            "SELECT * FROM total_training_hours_per_week WHERE student_id = :studentId", 
            {
                replacements: { studentId: req.session.student.student_id }, 
                type: TrainingSession.sequelize.QueryTypes.SELECT
            }
        );

        console.log("students progress: ",progressData);

        // Read the dashboard HTML file only once
        const dashboardPath = path.join(__dirname, '../public/html/dashboardStd.html');
        fs.readFile(dashboardPath, 'utf8', (err, html) => {
            if (err) {
                console.error("Error reading HTML file:", err);
                return res.status(500).send("Internal Server Error");
            }


//            const tableRows = progressData.map(row => console.log("row--->", row))

            const tableRows = progressData.map(row => `
                <tr>
                    <td>${row.student_id}</td>
                    <td>${row.name}</td>
                    <td>${new Date(row.week_start).toLocaleDateString()}</td>
                    <td>${row.total_hours ? Number(row.total_hours).toFixed(2) : '0.00'}</td>
                    <td>${row.classification}</td>
                </tr>
            `).join('');
   
            // const rowTotalHours = progressData.map( row =>

            // ) 
            // // Inject the table rows into the HTML
                const tableHTML = `
                <table border="1" style="width: 100%; text-align: left;">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Week Start</th>
                            <th>Total Hours</th>
                            <th>Classification</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            `;

            // Replace placeholders in the HTML
            html = html.replace("{{totalSessions}}", progressData.length || 0);
            html = html.replace("{{progressTable}}", tableHTML);

            
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
