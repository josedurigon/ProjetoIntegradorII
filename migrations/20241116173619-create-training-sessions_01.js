'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Creating the TrainingSessions table with necessary columns
    await queryInterface.createTable('TrainingSessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      entryTime: {
        type: Sequelize.DATE, // TIMESTAMP WITH TIME ZONE
        allowNull: false
      },
      exitTime: {
        type: Sequelize.DATE, // TIMESTAMP WITH TIME ZONE
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Dropping the TrainingSessions table if this migration is reverted
    await queryInterface.dropTable('TrainingSessions');
  }
};
