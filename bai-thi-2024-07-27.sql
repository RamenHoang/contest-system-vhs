# ************************************************************
# Sequel Ace SQL dump
# Version 20067
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 8.0.32)
# Database: baithi
# Generation Time: 2024-07-27 07:37:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table AnswerBankings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `AnswerBankings`;

CREATE TABLE `AnswerBankings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idQuestionBanking` int DEFAULT NULL,
  `answer` varchar(1000) NOT NULL,
  `isCorrect` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isFixed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idQuestionBanking` (`idQuestionBanking`) USING BTREE,
  CONSTRAINT `answerbankings_ibfk_1` FOREIGN KEY (`idQuestionBanking`) REFERENCES `QuestionBankings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;



# Dump of table Competitions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Competitions`;

CREATE TABLE `Competitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `rules` varchar(1000) NOT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `themeColor` varchar(10) NOT NULL DEFAULT '#000000',
  `timeStart` datetime NOT NULL,
  `timeEnd` datetime NOT NULL,
  `infoRequire` varchar(1000) NOT NULL,
  `testDuration` int DEFAULT NULL,
  `testAttempts` int DEFAULT NULL,
  `isMix` enum('question','question-answer') DEFAULT NULL,
  `unitGroupName` varchar(100) DEFAULT 'Nhóm/Đơn vị mới 2',
  `isPublic` tinyint(1) DEFAULT '0',
  `isDeleted` tinyint(1) DEFAULT '0',
  `creatorId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `bannerUrl` varchar(1000) DEFAULT NULL,
  `numberOfQuestion` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `creatorId` (`creatorId`) USING BTREE,
  CONSTRAINT `competitions_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `Users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;



# Dump of table ExamBankings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ExamBankings`;

CREATE TABLE `ExamBankings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `title` varchar(1000) NOT NULL,
  `total_mc_questions` int NOT NULL,
  `total_essay_questions` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;



# Dump of table ExamsOfCompetitions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ExamsOfCompetitions`;

CREATE TABLE `ExamsOfCompetitions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `competitionId` int NOT NULL,
  `examBankingId` int NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `competitionId` (`competitionId`) USING BTREE,
  KEY `examBankingId` (`examBankingId`) USING BTREE,
  CONSTRAINT `examsofcompetitions_ibfk_5` FOREIGN KEY (`competitionId`) REFERENCES `Competitions` (`id`),
  CONSTRAINT `examsofcompetitions_ibfk_6` FOREIGN KEY (`examBankingId`) REFERENCES `ExamBankings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;



# Dump of table Organizers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Organizers`;

CREATE TABLE `Organizers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `competitionId` int NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `competitionId` (`competitionId`) USING BTREE,
  CONSTRAINT `organizers_ibfk_1` FOREIGN KEY (`competitionId`) REFERENCES `Competitions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;



# Dump of table Participants
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Participants`;

CREATE TABLE `Participants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCompetition` int NOT NULL,
  `idUser` int DEFAULT NULL,
  `idSubUnit` int DEFAULT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `CCCD` varchar(100) DEFAULT NULL,
  `job` varchar(100) DEFAULT NULL,
  `sex` enum('nam','nữ','khác') DEFAULT NULL,
  `other` varchar(100) DEFAULT NULL,
  `startTime` datetime NOT NULL,
  `finishTime` datetime NOT NULL,
  `correctAnswersRate` float DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `totalCorrectAnswers` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idCompetition` (`idCompetition`) USING BTREE,
  KEY `idUser` (`idUser`) USING BTREE,
  KEY `idSubUnit` (`idSubUnit`) USING BTREE,
  CONSTRAINT `participants_ibfk_16` FOREIGN KEY (`idCompetition`) REFERENCES `Competitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `participants_ibfk_17` FOREIGN KEY (`idUser`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

LOCK TABLES `Participants` WRITE;
/*!40000 ALTER TABLE `Participants` DISABLE KEYS */;

INSERT INTO `Participants` (`id`, `idCompetition`, `idUser`, `idSubUnit`, `fullName`, `email`, `phone`, `birthday`, `CCCD`, `job`, `sex`, `other`, `startTime`, `finishTime`, `correctAnswersRate`, `isDeleted`, `createdAt`, `updatedAt`, `totalCorrectAnswers`)
VALUES
	(60,90,NULL,0,'Nguyễn Hoàng Anh','anhnguyenhoang321@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,'2024-07-25 15:10:50','2024-07-25 15:10:55',0,0,'2024-07-25 15:10:55','2024-07-25 15:10:55',0),
	(61,90,NULL,32,'Nguyễn Hoàng Anh','anhnguyenhoang321@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,'2024-07-25 15:16:01','2024-07-25 15:16:03',0,0,'2024-07-25 15:16:03','2024-07-25 15:16:03',0),
	(62,90,NULL,33,'Nguyễn Hoàng Anh','anhnguyenhoang321@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,'2024-07-25 15:17:41','2024-07-25 15:17:45',0,0,'2024-07-25 15:17:45','2024-07-25 15:17:45',0),
	(63,90,NULL,31,'Nguyễn Hoàng Anh','anhnguyenhoang321@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,'2024-07-25 16:21:13','2024-07-25 16:21:16',0,0,'2024-07-25 16:21:16','2024-07-25 16:21:16',0),
	(64,90,NULL,32,'ramenhoang','anhnguyenhoang321@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,'2024-07-25 16:33:12','2024-07-25 16:33:25',0,0,'2024-07-25 16:33:25','2024-07-25 16:33:25',0),
	(65,91,NULL,0,'Nguyễn Hoàng Anh','anhnguyenhoang321@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,'2024-07-25 17:06:56','2024-07-25 17:07:07',0,0,'2024-07-25 17:07:07','2024-07-25 17:07:07',0),
	(66,91,NULL,0,'ramenhoang','aegoonline@yahoo.com.vn',NULL,NULL,NULL,NULL,NULL,NULL,'2024-07-25 18:41:09','2024-07-25 18:41:29',0,0,'2024-07-25 18:41:29','2024-07-25 18:41:29',0),
	(68,91,NULL,0,'Nguyễn Hoàng Anh','anhnguyenhoang321@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,'2024-07-26 19:50:11','2024-07-26 19:50:20',0,0,'2024-07-26 19:50:20','2024-07-26 19:50:20',0);

/*!40000 ALTER TABLE `Participants` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table QuestionBankings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `QuestionBankings`;

CREATE TABLE `QuestionBankings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idExamBanking` int NOT NULL,
  `title` varchar(1000) NOT NULL,
  `lengthLimit` int DEFAULT NULL,
  `type` enum('MC','ESSAY') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idExamBanking` (`idExamBanking`) USING BTREE,
  CONSTRAINT `questionbankings_ibfk_1` FOREIGN KEY (`idExamBanking`) REFERENCES `ExamBankings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;



# Dump of table Units
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Units`;

CREATE TABLE `Units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;



# Dump of table UnitsCompetitions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `UnitsCompetitions`;

CREATE TABLE `UnitsCompetitions` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `competitionId` int NOT NULL,
  `UnitId` int NOT NULL,
  PRIMARY KEY (`competitionId`,`UnitId`),
  KEY `UnitId` (`UnitId`),
  CONSTRAINT `unitscompetitions_ibfk_1` FOREIGN KEY (`competitionId`) REFERENCES `Competitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `unitscompetitions_ibfk_2` FOREIGN KEY (`UnitId`) REFERENCES `Units` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table UserAnswers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `UserAnswers`;

CREATE TABLE `UserAnswers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionId` int NOT NULL,
  `chosenOption` int DEFAULT NULL,
  `correctOption` int DEFAULT NULL,
  `isCorrect` tinyint(1) DEFAULT NULL,
  `typeQuestion` enum('MC','ESSAY') NOT NULL,
  `participantId` int NOT NULL,
  `answerText` varchar(1000) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `questionId` (`questionId`) USING BTREE,
  KEY `correctOption` (`correctOption`) USING BTREE,
  KEY `participantId` (`participantId`) USING BTREE,
  CONSTRAINT `useranswers_ibfk_7` FOREIGN KEY (`questionId`) REFERENCES `QuestionBankings` (`id`),
  CONSTRAINT `useranswers_ibfk_8` FOREIGN KEY (`correctOption`) REFERENCES `AnswerBankings` (`id`),
  CONSTRAINT `useranswers_ibfk_9` FOREIGN KEY (`participantId`) REFERENCES `Participants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;



# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `isDeleted` tinyint(1) DEFAULT '0',
  `refreshToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `username`, `password`, `avatar`, `email`, `role`, `isDeleted`, `refreshToken`, `createdAt`, `updatedAt`)
VALUES
	(1,'admin','$2a$12$LC/nvzm6W4ZncA7DlzySGO6FJXVmqg2fkooIxzqptycGHhvD7ScO2',NULL,'admin@gmail.com','admin',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjIwMTQ3MDksImV4cCI6MTcyMzMxMDcwOX0.6bune_Up7KXEZ4-wUrR2emvjg3EfllGPjEP44V33IQI','2024-07-03 19:34:07','2024-07-26 17:25:09');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
