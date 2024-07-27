const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const UnitController = require("../controllers/UnitController");

router.get('/', AuthMiddleware, UnitController.getUnits);
router.post('/', AuthMiddleware, UnitController.createUnit);
router.put('/:id', AuthMiddleware, UnitController.editUnit);
router.delete('/:id', AuthMiddleware, UnitController.deleteUnit);

module.exports = router;
