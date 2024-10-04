const { Student } = require('../models');

// Register a new student
exports.registerStudent = async (req, res) => {
    try {
        const { 
            name,
             email,
              phone,
               dateOfBirth 
            } = req.body;

            console.log(req.body)

        // Check if student already exists
        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already registered with this email.' });
        }

        // Create new student
        const newStudent = await Student.create({ 
            name, 
            email, 
            phone, 
            dateOfBirth 
        });

        res.status(201).json({ message: 'Student registered successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }
};
