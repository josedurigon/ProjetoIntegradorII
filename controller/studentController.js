const { Student } = require('../models');

exports.registerStudent = async (req, res) => {
    try {
        const { 
            name,
             email,
              phone,
               dateOfBirth 
            } = req.body;

            console.log(req.body)

        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
            return res.status(400)
        }

        const newStudent = await Student.create({ 
            name, 
            email,  
            phone, 
            dateOfBirth 
        });
        
        res.redirect('/')
        // res.status(201).json({ message: 'Student registered successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }

};
