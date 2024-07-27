// models/AnswerBanking.js
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");
const QuestionBanking = require("./QuestionBanking");

class AnswerBanking extends Model {}

AnswerBanking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idQuestionBanking: {
      type: DataTypes.INTEGER,
    },
    answer: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFixed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "AnswerBanking",
    timestamps: true,
  }
);

// Define associations
AnswerBanking.belongsTo(QuestionBanking, {
  foreignKey: "idQuestionBanking",
  onDelete: "CASCADE",
});

module.exports = AnswerBanking;
