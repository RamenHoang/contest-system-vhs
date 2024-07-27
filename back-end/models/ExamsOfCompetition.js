//Create a table to store information about entries for the contest
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Competitions = require("./Competitions");
const ExamBanking = require("./ExamBanking");

class ExamsOfCompetition extends Model {}

ExamsOfCompetition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    competitionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Competitions,
        key: "id",
      },
    },
    examBankingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ExamBanking,
        key: "id",
      },
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ExamsOfCompetition",
    timestamps: true,
  }
);

module.exports = ExamsOfCompetition;
