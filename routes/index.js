var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    fs.readFile('./public/html/base.html', function (err, html) {
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

router.get('/register', function(req, res){
    fs.readFile('./public/html/register.html', function(err, html){
        if(err){
            throw err;

        }
        else{
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);  
            res.end();  
        }
    })
})




module.exports = router;