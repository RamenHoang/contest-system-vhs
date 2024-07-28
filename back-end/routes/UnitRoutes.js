const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const UnitController = require("../controllers/UnitController");

router.get('/', AuthMiddleware, UnitController.getUnits);
router.post('/', AuthMiddleware, UnitController.createUnit);
router.put('/:id', AuthMiddleware, UnitController.editUnit);
router.delete('/:id', AuthMiddleware, UnitController.deleteUnit);
router.post('/import_from_file', AuthMiddleware, upload.single("xlsx"), UnitController.importFromFile);

module.exports = router;
