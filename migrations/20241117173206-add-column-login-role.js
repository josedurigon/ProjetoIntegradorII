'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the 'role' column to the 'Logins' table
    await queryInterface.addColumn('Logins', 'role', {
      type: Sequelize.STRING,
      allowNull: false, // Set to 'false' if you want this column to be required
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the 'role' column from the 'Logins' table
    await queryInterface.removeColumn('Logins', 'role');
  }
};
