const express = require("express");
const router = express.Router();

const ExamController = require("../controllers/ExamController");
const ExamRoutesValidations = require("./validators/ExamRoutes.validators");
const HandleBadRequest = require("../middlewares/HandleBadRequestMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const upload = require("../config/multer.config");

router.get(
  "/get-exams-by-current-user",
  AuthMiddleware,
  ExamController.getExamsByCurrentUser
);

router.post(
  "/create-exam",
  AuthMiddleware,
  ExamRoutesValidations.createExamValidation,
  HandleBadRequest,
  ExamController.createExam
);

router.put(
  "/update-exam/:id",
  AuthMiddleware,
  ExamRoutesValidations.createExamValidation,
  HandleBadRequest,
  ExamController.updateExam
);

router.post(
  "/create-or-update-questions/:examId",
  AuthMiddleware,
  ExamController.updateQuestions
);

router.delete(
  "/delete-question/:questionIds",
  AuthMiddleware,
  ExamController.deleteQuestions
);

router.get(
  "/get-exam-detail/:id",
  AuthMiddleware,
  ExamRoutesValidations.detailExamValidation,
  HandleBadRequest,
  ExamController.getExamById
);

router.post(
  "/import-exam-from-docx",
  upload.single("docx"),
  ExamController.importExamFromDocx
);

router.delete("/delete/:id", AuthMiddleware, ExamController.deleteExam);

module.exports = router;
