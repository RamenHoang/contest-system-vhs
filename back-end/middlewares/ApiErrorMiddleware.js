const ApiResponse = require("../controllers/response/ApiResponse");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../controllers/error/ApiError");

const ApiErrorMiddleware = (e, req, res, next) => {
  const statusCode = e.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = e.message || "Internal Server Error";
  const errorObject = e.data || null;
  if (e instanceof ApiError) {
    console.error("💕:" + e);
  } else {
    console.error("An unknown error occurred:" + e);
  }

  return res
    .status(statusCode)
    .json(ApiResponse(errorObject, 0, statusCode, message));
};

module.exports = ApiErrorMiddleware;
