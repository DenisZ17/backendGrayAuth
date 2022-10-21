const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), serviceController.create);
router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getOne);
router.delete("/:id", checkRole("ADMIN"), serviceController.delete);
router.put("/:id", checkRole("ADMIN"), serviceController.update);
module.exports = router;
