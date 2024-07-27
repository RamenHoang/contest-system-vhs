const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");
const Competitions = require("./Competitions");
const ExamsCompetitions = require("./ExamsCompetitions");

class Unit extends Model {}

Unit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Unit",
    timestamps: true,
  }
);

Unit.associate = (models) => {
  Unit.belongsToMany(models.Competitions, {
    through: models.ExamsCompetitions,
    foreignKey: "unitId",
    as: "Competitions",
  });
};
module.exports = Unit;
