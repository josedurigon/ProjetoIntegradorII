var fs = require('fs');
var express = require('express');
const path = require('path');
var router = express.Router();
const {Login} = require('../models')
const {Op} = require('sequelize')


// /* GET home page ADM. */
// router.get('/home', function(req, res) {
//     fs.readFile('./public/html/homeAdm.html', function (err, html) {

//         if (err) {
//             throw err; 
//         }      
//         else { 


//             res.writeHeader(200, {"Content-Type": "text/html"});  
            
//             console.log("router homepage")

//             // var loggedUser = Login.findOne({
//             //     where : {[Op.eq] : {email : email}}
//             // })

//             // console.log("Usuario logado", loggedUser)
//             // if (loggedUser.role == "STD"){
//             //     console.log("Caiu dentro do if")
//             //     // document.getElementById("botao-dashboard").style = hidden;
//             // }

//             res.write(html);  
//             res.end();  
//         }
//     });    
      

// });


router.get('/home', function(req, res) {
    // Check if user is authenticated and session data exists
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if no session data
    }

    // Determine which HTML file to serve based on user role
    let htmlFileName = req.session.user.role === "ADM" ? "homeAdm" : "homeStd";

    // Construct the path to the HTML file
    const filePath =  `./public/html/${htmlFileName}.html`;
    console.log("Role de usuario",req.session.user.role)
    // Read and send the correct HTML file
    fs.readFile(filePath, function (err, html) {
        if (err) {
            console.error("Error reading HTML file:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(html);
            res.end();
        }
    });
});

module.exports = router;
