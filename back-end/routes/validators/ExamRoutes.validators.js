const { body, param } = require("express-validator");

const createExamValidation = [
  body("title").notEmpty().withMessage("Title is required.").trim(),

  body("totalMCQuestion")
    .isInt({ min: 0 })
    .withMessage("TotalMCQuestion must be a non-negative integer.")
    .toInt(),

  body("totalEssayQuestion")
    .isInt({ min: 0 })
    .withMessage("TotalEssayQuestion must be a non-negative integer.")
    .toInt(),
];

const detailExamValidation = [
  param("id").isInt({ min: 0 }).withMessage("Id must be a positive integer."),
];

module.exports = { createExamValidation, detailExamValidation };
