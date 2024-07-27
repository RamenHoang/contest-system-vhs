const { validationResult } = require("express-validator");
const ApiResponse = require("../controllers/response/ApiResponse");
const ApiError = require("../controllers/error/ApiError");
const { Json } = require("sequelize/lib/utils");

const HandleBadRequest = (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const response = ApiResponse(false, 0, 400, errors[0].msg);
    throw new ApiError(response);
  }

  next();
};

module.exports = HandleBadRequest;
