const AsyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const ApiResponse = require("../controllers/response/ApiResponse");
const { StatusCodes } = require("http-status-codes");

// importing all routes
const AuthRoutes = require("./AuthRoutes");
const ExamRoutes = require("./ExamRoutes");
const CompetitionRoutes = require("./CompetitionRoutes");
const UnitRoutes = require("./UnitRoutes");

// assign prefix - to routes
router.use("/auth", AuthRoutes);
router.use("/exam", ExamRoutes);
router.use("/competitions", CompetitionRoutes);
router.use("/units", UnitRoutes);
router.use(
  "/",
  AsyncHandler(async (req, res) => {
    res.json(
      ApiResponse("Api Running Successfully.", null, StatusCodes.CREATED)
    );
  })
);

module.exports = router;
