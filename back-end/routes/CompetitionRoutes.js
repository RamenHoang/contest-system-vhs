const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const HandleBadRequest = require("../middlewares/HandleBadRequestMiddleware");
const CompetitionRoutesValidations = require("./validators/CompetitionRoutes.validators");
const CompetitionController = require("../controllers/CompetitionController");
const upload = require("../config/multer.config");

router.get("/list-info-required", CompetitionController.listInfoRequired);

router.post(
  "/create-competitions",
  AuthMiddleware,
  CompetitionRoutesValidations.createCompetitionValidation,
  HandleBadRequest,
  CompetitionController.createCompetition
);

router.get(
  "/get-competitions-by-user",
  AuthMiddleware,
  CompetitionController.getCompetitionsByUser
);

router.get(
  "/get-competition-by-id/:id",
  CompetitionController.getCompetitionById
);

router.post(
  "/upload-image",
  upload.single("file"),
  AuthMiddleware,
  HandleBadRequest,
  CompetitionController.uploadImage
);

router.get(
  "/get-info-step2/:id",
  AuthMiddleware,
  CompetitionController.getExamsOfCompetition
);

router.post(
  "/set-up-exam/:id",
  AuthMiddleware,
  CompetitionController.chooseExamForCompetition
);

router.delete(
  "/delete-exam-of-competition/:id",
  AuthMiddleware,
  CompetitionController.deleteExamForCompetition
);

router.get("/list-competition", CompetitionController.getListCompetition);

//#region Step 3
router.post(
  "/add-units/:id",
  AuthMiddleware,
  CompetitionController.addUnitsForCompetitions
);

router.get(
  "/get-units/:id",
  AuthMiddleware,
  CompetitionController.getUnitsOfCompetition
);

router.put(
  "/update-unit/:id",
  AuthMiddleware,
  CompetitionController.updateSubUnit
);

router.delete(
  "/delete-unit/:id",
  AuthMiddleware,
  CompetitionController.deleteSubUnit
);
//#endregion

//#region Step 4
router.get(
  "/get-info-organizer/:competitionId",
  CompetitionController.getOrganizerByCompetition
);

router.post(
  "/info-organizer/:competitionId",
  AuthMiddleware,
  CompetitionRoutesValidations.infoOrganizerValidation,
  HandleBadRequest,
  CompetitionController.infoOrganizer
);
//#endregion

//#region step 5
router.get(
  "/publish-competition/:id",
  AuthMiddleware,
  CompetitionController.publishCompetition
);
//#endregion

//#region  Làm bài thi
router.get(
  "/start-competition/:id",
  CompetitionController.getAllQuestionOfCompetition
);

router.post("/submit-answer/:id", CompetitionController.saveResultCompetition);

//#endregion

router.get(
  "/statistic-participant/:id",
  CompetitionController.statisticParticipant
);

//export excel
router.get(
  "/export-excel/:id",
  AuthMiddleware,
  CompetitionController.exportExcel
);

//delete
router.delete(
  "/delete/:id",
  AuthMiddleware,
  CompetitionController.deleteCompetition
);

// Copy competition
router.post(
  "/copy/:id",
  AuthMiddleware,
  CompetitionController.copyCompetition
);

router.delete(
  "/:id/units/:unitId",
  AuthMiddleware,
  CompetitionController.deleteUnit
);

router.get(
  "/:id/available-units",
  AuthMiddleware,
  CompetitionController.getAvailableUnits
);

router.post(
  "/:id/units",
  AuthMiddleware,
  CompetitionController.addUnits
);

router.post(
  "/:id/check-test-attempts",
  CompetitionController.checkTestAttempts
);

module.exports = router;
