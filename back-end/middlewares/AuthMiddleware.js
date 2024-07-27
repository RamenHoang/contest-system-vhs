/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const AsyncHandler = require("express-async-handler");
const ApiResponse = require("../controllers/response/ApiResponse");
const ApiError = require("../controllers/error/ApiError");

const Auth = AsyncHandler(async (request, response, next) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // extract token
      token = request.headers.authorization.split(" ")[1];

      // verify token
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          throw new ApiError(
            ApiResponse(
              false,
              0,
              401,
              "User Not Authorized, JWT Token not valid"
            )
          );
        }
        request.user = user;
      });
      next();
    } catch (e) {
      if (process.env.ENVIRONMENT === "development") {
        console.log(e);
      }
      throw new ApiError(
        ApiResponse(false, 0, 401, "User Not Authorized, JWT Token not valid")
      );
    }
  }

  if (!token) {
    throw new ApiError(
      ApiResponse(false, 0, 401, "User Not Authorized, JWT Token not found")
    );
  }
});

module.exports = Auth;
