const { body } = require("express-validator");
const moment = require("moment");

const createCompetitionValidation = [
  body("name").notEmpty().withMessage("Name is required"),
];

const infoOrganizerValidation = [
  body("name").notEmpty().withMessage("Không được để trống tên!"),
  body("phone")
    .notEmpty()
    .withMessage("Không được để trống số điện thoại!")
    .isMobilePhone("vi-VN")
    .withMessage("Số điện thoại không hợp lệ!"),
];

module.exports = {
  createCompetitionValidation,
  infoOrganizerValidation,
};
