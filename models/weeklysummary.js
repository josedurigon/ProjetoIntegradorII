'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeeklySummary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WeeklySummary.init({
    summary_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    weekly_classification: DataTypes.STRING,
    total_hours: DataTypes.FLOAT,
    week_start: DataTypes.DATE,
    week_end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'WeeklySummary',
  });
  return WeeklySummary;
};