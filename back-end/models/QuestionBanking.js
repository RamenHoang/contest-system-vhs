const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");
const ExamBanking = require("./ExamBanking");

class QuestionBanking extends Model {}

QuestionBanking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idExamBanking: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    lengthLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("MC", "ESSAY"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "QuestionBanking",
    timestamps: true,
  }
);

// Define associations
QuestionBanking.belongsTo(ExamBanking, {
  foreignKey: "idExamBanking",
  onDelete: "CASCADE",
});

module.exports = QuestionBanking;
