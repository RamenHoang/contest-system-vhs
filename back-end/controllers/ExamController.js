const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const fs = require("fs");
const mammoth = require("mammoth");

const ExamBanking = require("../models/ExamBanking");
const QuestionBanking = require("../models/QuestionBanking");
const AnswerBanking = require("../models/AnswerBanking");
const ApiError = require("../controllers/error/ApiError");
const ApiResponse = require("../controllers/response/ApiResponse");
const { sequelize } = require("../config/db");

const createExam = async (req, res, next) => {
  try {
    const { title, totalMCQuestion, totalEssayQuestion } = req.body;
    // Create exam
    const exam = await ExamBanking.create({
      idUser: req.user.id,
      title,
      total_mc_questions: totalMCQuestion,
      total_essay_questions: totalEssayQuestion,
    });

    await exam.save();

    res
      .status(StatusCodes.CREATED)
      .json(ApiResponse(exam.id, 1, StatusCodes.CREATED, "Exam created."));
  } catch (error) {
    next(error);
  }
};

const updateExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, totalMCQuestion, totalEssayQuestion } = req.body;
    // Find exam by ID
    const exam = await ExamBanking.findByPk(id);

    if (!exam) {
      throw new ApiError(
        ApiResponse(false, 0, StatusCodes.NOT_FOUND, "Exam not found.")
      );
    }

    // Update exam
    await ExamBanking.update(
      {
        title,
        total_mc_questions: totalMCQuestion,
        total_essay_questions: totalEssayQuestion,
      },
      { where: { id } }
    );

    res
      .status(StatusCodes.OK)
      .json(ApiResponse(id, 1, StatusCodes.OK, "Exam updated."));
  } catch (error) {
    next(error);
  }
};

const updateQuestions = async (req, res, next) => {
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    const { examId } = req.params;
    const { questions } = req.body;

    // Find exam by ID
    const exam = await ExamBanking.findOne({
      where: { id: examId },
      transaction,
    });

    if (!exam) {
      throw new ApiError(
        ApiResponse(false, 0, StatusCodes.NOT_FOUND, "Exam not found.")
      );
    }

    // Process questions
    for (const question of questions) {
      const { id, title, lengthLimit = null, type, answers } = question;

      let questionBanking;
      if (id) {
        // Update existing question
        await QuestionBanking.update(
          { title, lengthLimit, type },
          { where: { id }, transaction }
        );
        questionBanking = { id }; // Reference for updating answers
      } else {
        // Create new question
        questionBanking = await QuestionBanking.create(
          { idExamBanking: examId, title, lengthLimit, type },
          { transaction }
        );
      }

      // Process answers
      for (const answer of answers) {
        const { id: answerId, answerText, isCorrect, isFixed } = answer;

        if (answerId) {
          // Update existing answer
          await AnswerBanking.update(
            { answer: answerText, isCorrect, isFixed },
            { where: { id: answerId }, transaction }
          );
        } else {
          // Create new answer
          await AnswerBanking.create(
            {
              idQuestionBanking: questionBanking.id,
              answer: answerText,
              isCorrect,
              isFixed,
            },
            { transaction }
          );
        }
      }
    }

    //calc total mc questions, total essay questions
    const totalMCQuestions = questions.filter(
      (question) => question.type === "MC"
    );
    const totalEssayQuestions = questions.filter(
      (question) => question.type === "ESSAY"
    );

    exam.total_mc_questions = totalMCQuestions.length;
    exam.total_essay_questions = totalEssayQuestions.length;

    await exam.save({ transaction });
    await transaction.commit();

    return res.status(StatusCodes.OK).json(ApiResponse(true, 0));
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of error
    console.error("Error updating questions:", error);

    next(error);
  }
};

const deleteQuestions = async (req, res, next) => {
  try {
    const { questionIds } = req.params;

    // Delete questions
    await QuestionBanking.destroy({
      where: {
        id: questionIds,
      },
    });

    // Delete answers if any
    await AnswerBanking.destroy({
      where: {
        idQuestionBanking: questionIds,
      },
    });

    res
      .status(StatusCodes.OK)
      .json(ApiResponse(true, 0, StatusCodes.OK, "Questions deleted."));
  } catch (error) {
    next(error);
  }
};

const getExamsByCurrentUser = async (req, res, next) => {
  try {
    const { pageIndex = 1, pageSize = 50, keyword } = req.query;
    const pageIndexInt = parseInt(pageIndex, 10);
    const pageSizeInt = parseInt(pageSize, 10);
    //find exams by current user, keyword contains in title
    let whereClause = {
      idUser: req.user.id,
    };

    if (keyword && keyword.trim()) {
      whereClause.title = {
        [Op.like]: `%${keyword}%`,
      };
    }
    const exams = await ExamBanking.findAll({
      where: whereClause,
      attributes: [
        "id",
        "title",
        "total_mc_questions",
        "total_essay_questions",
        "createdAt",
      ],
      limit: pageSizeInt,
      offset: (pageIndexInt - 1) * pageSizeInt,
      order: [["createdAt", "DESC"]],
    });

    const resData = exams.map((item) => ({
      id: item.id,
      title: item.title,
      totalMCQuestion: item.total_mc_questions,
      totalEssayQuestion: item.total_essay_questions,
      createdAt: item.createdAt,
    }));

    res.status(StatusCodes.OK).json(ApiResponse(resData, exams.length));
  } catch (error) {
    console.log("Error:" + error);
    next(error);
  }
};

const getExamById = async (req, res, next) => {
  try {
    const { id } = req.params;
    //find exam by id
    const idParams = parseInt(id, 10);
    const exam = await ExamBanking.findOne({
      where: {
        id: idParams,
      },
    });

    const resData = {
      id: exam.id,
      idUser: exam.idUser,
      title: exam.title,
      totalMCQuestion: exam.total_mc_questions,
      totalEssayQuestion: exam.total_essay_questions,
      createdAt: exam.createdAt,
      updatedAt: exam.updatedAt,
    };

    if (!exam) {
      throw new ApiError(
        ApiResponse(false, 0, StatusCodes.NOT_FOUND, "Exam not found.")
      );
    }

    const questions = await QuestionBanking.findAll({
      where: {
        idExamBanking: exam.id,
      },
      attributes: ["id", "title", "lengthLimit", "type", "createdAt"],
    });

    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const answers = await AnswerBanking.findAll({
          where: {
            idQuestionBanking: question.id,
          },
          attributes: ["id", "answer", "isCorrect", "isFixed", "createdAt"],
        });

        return {
          ...question.toJSON(),
          answers: answers.map((answer) => {
            const data = answer.toJSON();
            return {
              id: data.id,
              answerText: data.answer,
              isCorrect: data.isCorrect,
              isFixed: data.isFixed,
              createdAt: data.createdAt,
            };
          }),
        };
      })
    );

    const responseData = {
      ...resData,
      questions: questionsWithAnswers,
    };

    res.status(StatusCodes.OK).json(ApiResponse(responseData));
  } catch (error) {
    console.log("Error:" + error);
    next(error);
  }
};

const importExamFromDocx = async (req, res, next) => {
  try {
    const acceptedExtensions = ["doc", "docx"];
    //get extension of file
    const fileExtension = req.file.originalname.split(".").pop();
    //check if file extension is valid
    if (!acceptedExtensions.includes(fileExtension)) {
      throw new ApiError(
        ApiResponse(false, 0, StatusCodes.BAD_REQUEST, "Invalid file format.")
      );
    }

    let content = "";
    const pTagRegex = /<p(.*?)>(.*?)<\/p>/g;
    let isCorrectRegex = /font-weight:\s?bold/;

    if (fileExtension === "docx") {
      const result = await mammoth.convertToHtml({ path: req.file.path });
      content = result.value;
      isCorrectRegex = /<strong>(.*?)<\/strong>/g;
    } else if (fileExtension === "doc") {
      content = fs.readFileSync(req.file.path, "utf-8");
    }

    const questions = content.match(/<h3>(.*?)<\/h3>([\s\S]*?)(?=<h3>|$)/g);
    const examData = [];

    if (questions) {
      questions.forEach((questionHtml) => {
        const questionMatch = questionHtml.match(/<h3>(.*?)<\/h3>/);
        let title = questionMatch ? questionMatch[1] : "";

        // Title is <a id="_e5szjnx0fule"></a>What is 2 + 2?
        // Remove the <a> tag
        const titleMatch = title.match(/<\/a>(.*?)\?/);
        title = titleMatch ? titleMatch[1] : title;

        // Title will in format: Câu {number}: What is 2 + 2?
        // Remove the "Câu {number}}: " prefix
        title = title.replace(/Câu \d+:/, "");
        title = title.trim();

        const answers = [];
        let match;

        while ((match = pTagRegex.exec(questionHtml)) !== null) {
          const [, styleAttribute, text] = match;

          //when file docx
          if (fileExtension === "docx") {
            let isCorrect = new RegExp(isCorrectRegex).test(text);
            let answerText = text.replace(/<strong>|<\/strong>/g, "");
            answers.push({ answerText, isCorrect });
          } else if (fileExtension === "doc") {
            let answerText = text.trim();
            let isCorrect = isCorrectRegex.test(styleAttribute);
            answers.push({ answerText, isCorrect });
          }
        }
        examData.push({ title, type: "MC", answers });
      });
    }

    // Remove the file after reading
    fs.unlink(req.file.path, () => {});

    res.status(StatusCodes.OK).json(ApiResponse(examData, examData.length));
  } catch (error) {
    next(error);
  }
};

const deleteExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Find exam by ID
    const exam = await ExamBanking.findByPk(id);

    if (!exam) {
      throw new ApiError(
        ApiResponse(false, 0, StatusCodes.NOT_FOUND, "Exam not found.")
      );
    }

    // Delete exam
    await exam.destroy();

    res
      .status(StatusCodes.OK)
      .json(ApiResponse(true, 0, StatusCodes.OK, "Exam deleted."));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExamsByCurrentUser,
  updateQuestions,
  deleteQuestions,
  createExam,
  updateExam,
  getExamById,
  importExamFromDocx,
  deleteExam,
};
