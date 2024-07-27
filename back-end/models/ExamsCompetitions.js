//Create a table to store information about entries for the contest
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Competitions = require("./Competitions");
const Unit = require("./Unit");

class UnitsCompetitions extends Model {}

UnitsCompetitions.init(
  {},
  {
    sequelize,
    modelName: "UnitsCompetitions",
    timestamps: true,
  }
);

module.exports = UnitsCompetitions;
