const express = require("express");
const typeServiceController = require("../controllers/typeServiceController");
const checkRole = require("../middleware/checkRoleMiddleware");
const router = express.Router();

router.post("/", checkRole("ADMIN"), typeServiceController.create);
router.get("/", typeServiceController.getAll);
router.get("/:id", typeServiceController.getOne);
router.delete("/:id", checkRole("ADMIN"), typeServiceController.delete);
router.put("/:id", checkRole("ADMIN"), typeServiceController.update);
module.exports = router;
