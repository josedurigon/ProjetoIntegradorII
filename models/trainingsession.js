'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainingSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TrainingSession.init({
    student_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    entryTime: DataTypes.DATE,
    exitTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TrainingSession',
  });
  return TrainingSession;
};