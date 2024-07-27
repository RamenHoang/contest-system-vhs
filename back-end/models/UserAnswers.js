const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");
const Participant = require("./Participant");
const QuestionBanking = require("./QuestionBanking");
const AnswerBanking = require("./AnswerBanking");

class UserAnswers extends Model {}

UserAnswers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: QuestionBanking,
        key: "id",
      },
    },
    chosenOption: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    correctOption: {
      type: DataTypes.INTEGER,
      references: {
        model: AnswerBanking,
        key: "id",
      },
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
    },
    typeQuestion: {
      type: DataTypes.ENUM("MC", "ESSAY"),
      allowNull: false,
    },
    participantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Participant,
        key: "id",
      },
    },
    answerText: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    sequelize,
    modelName: "UserAnswers",
    timestamps: true,
  }
);

UserAnswers.belongsTo(QuestionBanking, {
  foreignKey: "questionId",
});

module.exports = UserAnswers;
