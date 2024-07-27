const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const moment = require('moment');
const ExcelJS = require('exceljs');

const Competitions = require('../models/Competitions');
const ApiError = require('../controllers/error/ApiError');
const ApiResponse = require('../controllers/response/ApiResponse');
const ExamsOfCompetition = require('../models/ExamsOfCompetition');
const Unit = require('../models/Unit');
const ExamBanking = require('../models/ExamBanking');
const Organizer = require('../models/Organizer');
const QuestionBanking = require('../models/QuestionBanking');
const AnswerBanking = require('../models/AnswerBanking');
const Participant = require('../models/Participant');
const UserAnswers = require('../models/UserAnswers');
const sequelize = require('sequelize');

const getUnits = async (req, res, next) => {
  try {
    const { pageIndex = 1, pageSize = 50, keyword = '' } = req.query;

    const offset = (+pageIndex - 1) * +pageSize;

    const { count, rows: units } = await Unit.findAndCountAll({
      attributes: [
        'id',
        'name',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
      limit: +pageSize,
      offset: offset,
    });

    return res.status(StatusCodes.OK).json(ApiResponse(units, count));
  } catch (error) {
    console.error('Error fetching units:', error);
    next(error);
  }
};

const createUnit = async (req, res, next) => {
  try {
    const { name } = req.body;

    const unit = await Unit.create({
      name,
    });

    return res.status(StatusCodes.CREATED).json(ApiResponse(unit));
  } catch (error) {
    console.error('Error create unit', error);
    next(error);
  }
}

const editUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const unit = await Unit.findByPk(id);

    if (!unit) {
      return next(ApiError.notFound('Unit not found'));
    }

    unit.name = name;

    await unit.save();

    return res.status(StatusCodes.OK).json(ApiResponse(unit));
  } catch (error) {
    console.error('Error create unit', error);
    next(error);
  }
}

const deleteUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const unit = await Unit.findByPk(id);

    if (!unit) {
      return next(ApiError.notFound('Unit not found'));
    }

    await unit.destroy();

    return res.status(StatusCodes.NO_CONTENT).json(ApiResponse(null));
  } catch (error) {
    console.error('Error create unit', error);
    next(error);
  }
}

module.exports = {
  getUnits,
  createUnit,
  deleteUnit,
  editUnit
};
