const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const HandleBadRequest = require("../middlewares/HandleBadRequestMiddleware");
const AuthRoutesValidations = require("./validators/AuthRoutes.validators");

router.post("/login-google", AuthController.loginGoogle);

router.post(
  "/login",
  AuthRoutesValidations.loginValidation,
  HandleBadRequest,
  AuthController.login
);

router.post("/logout", AuthMiddleware, AuthController.logout);

module.exports = router;
