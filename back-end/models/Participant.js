const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");
const Competition = require("./Competitions");
const User = require("./User");
const Unit = require("./Unit");
const UserAnswers = require("./UserAnswers");

class Participant extends Model {}

Participant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idCompetition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    idSubUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(100),
    },
    birthday: {
      type: DataTypes.DATE,
    },
    CCCD: {
      type: DataTypes.STRING(100),
    },
    job: {
      type: DataTypes.STRING(100),
    },
    sex: {
      type: DataTypes.ENUM("nam", "nữ", "khác"),
    },
    other: {
      type: DataTypes.STRING(100),
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finishTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalCorrectAnswers: {
      type: DataTypes.INTEGER,
    },
    correctAnswersRate: {
      type: DataTypes.FLOAT,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Participant",
    timestamps: true,
  }
);

// Define associations with unit
Participant.belongsTo(Unit, {
  foreignKey: "idSubUnit"
});

Participant.hasMany(UserAnswers, {
  foreignKey: "participantId"
});

module.exports = Participant;
