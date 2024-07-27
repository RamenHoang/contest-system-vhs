const { sequelize } = require("../config/db");
const User = require("./User");
const ExamBanking = require("./ExamBanking");
const QuestionBanking = require("./QuestionBanking");
const AnswerBanking = require("./AnswerBanking");
const Competitions = require("./Competitions");
const ExamsOfCompetition = require("./ExamsOfCompetition");
const Organizer = require("./Organizer");
const Unit = require("./Unit");
const Participant = require("./Participant");
const UserAnswers = require("./UserAnswers");

const SyncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    ExamBanking.hasMany(QuestionBanking, { foreignKey: "idExamBanking" });
    QuestionBanking.belongsTo(ExamBanking, { foreignKey: "idExamBanking" });

    QuestionBanking.hasMany(AnswerBanking, { foreignKey: "idQuestionBanking" });

    AnswerBanking.belongsTo(QuestionBanking, {
      foreignKey: "idQuestionBanking",
    });

    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database", error);
  } finally {
    await sequelize.close();
  }
};

module.exports = SyncDatabase;
