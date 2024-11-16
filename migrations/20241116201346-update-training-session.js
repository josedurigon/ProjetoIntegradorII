'use strict';

/** @type {import('sequelize-cli').Migration} */

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('TrainingSessions', 'createdAt', {
        type: Sequelize.DATEONLY, // DATEONLY maps to DATE in PostgreSQL
        allowNull: false         // Set based on your requirements
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('TrainingSessions', 'createdAt', {
        type: Sequelize.DATE, // Revert back if necessary
        allowNull: false
      });
    }
  };
