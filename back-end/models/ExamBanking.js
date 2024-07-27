// Example: exam.model.js

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db"); // Assuming your Sequelize instance is exported from db.js

class ExamBanking extends Model {}

ExamBanking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    total_mc_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_essay_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Other attributes
  },
  {
    sequelize,
    modelName: "ExamBanking",
    timestamps: true,
  }
);

module.exports = ExamBanking;
