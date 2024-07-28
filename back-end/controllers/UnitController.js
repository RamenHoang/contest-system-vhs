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

const importFromFile = async (req, res, next) => {
  try {
    const acceptedExtensions = ['xlsx'];
    //get extension of file
    const fileExtension = req.file.originalname.split('.').pop();
    //check if file extension is valid
    if (!acceptedExtensions.includes(fileExtension)) {
      throw new ApiError(
        ApiResponse(false, 0, StatusCodes.BAD_REQUEST, 'Chỉ chấp nhận file excel với định dạng xlsx')
      );
    }

    const workbook = new ExcelJS.Workbook();

    // Load file from req
    await workbook.xlsx.readFile(req.file.path);

    const worksheet = workbook.getWorksheet("Đơn vị");

    // Ech row has 2 cells: no. and unit name
    // Only get the unit name where row's no. is number
    // no. may be 1, 2, 3, I, II, III, ...

    const units = [];

    worksheet.eachRow((row) => {
      const _no = row.getCell(1);
      const unitName = row.getCell(2);

      // _no may be 1, 2, 3, I, II, III, ...
      // If _no is number, then it's the row we need
      if (!isNaN(_no.value)) {
        units.push({
          name: unitName.value,
        });
      }
    });

    await Unit.bulkCreate(units);

    return res.status(StatusCodes.CREATED).json(ApiResponse(units));
  } catch (error) {
    console.error('Error importing units from file:', error);
    next(error);
  }
}

module.exports = {
  getUnits,
  createUnit,
  deleteUnit,
  editUnit,
  importFromFile
};
