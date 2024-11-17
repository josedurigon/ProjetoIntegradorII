const { Op } = require('sequelize');
const { TrainingSession, Student } = require('../models'); // Adjust path as needed
let classification = require('../enums');
const Classification = require('../enums/classificationENUM');

async function getWeeklyHours() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const sessions = await TrainingSession.findAll({
        where: {
            date: { [Op.gte]: oneWeekAgo },
            exitTime: { [Op.ne]: null } 
        },
        include: [{ model: Student, attributes: ['id', 'name', 'email'] }]
    });

    const studentHours = {};

    sessions.forEach(session => {
        const studentId = session.student_id;
        const timeInHours = (session.exitTime - session.entryTime) / (1000 * 60 * 60); // ms -> h

        if (!studentHours[studentId]) {
            studentHours[studentId] = { student: session.Student, hours: 0 };
        }

        studentHours[studentId].hours += timeInHours;
    });

    return studentHours;
}


function classifyStudents(studentHours) {
    const classifications = {};

    Object.values(studentHours).forEach(({ student, hours }) => {
        let classification = '';

        if (hours <= 5) {
            classification = Classification.INICIANTE;
        } else if (hours <= 10) {
            classification = Classification.INTERMEDIARIO;
        } else if(hours <= 20) {
            classification = Classification.AVANCADO;
        } else{
            classification = Classification.EXTREMAMENTE_AVANCADO;
        }

        classifications[student.id] = {
            name: student.name,
            email: student.email,
            hours: hours.toFixed(2), 
            classification
        };
    });

    return classifications;
}
