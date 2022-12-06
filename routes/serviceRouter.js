const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", serviceController.create);
router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getOne);
router.delete("/:id", serviceController.delete);
router.put("/:id", serviceController.update);
module.exports = router;
