const express = require("express");
const typeServiceController = require("../controllers/typeServiceController");
const checkRole = require("../middleware/checkRoleMiddleware");
const router = express.Router();

router.post("/", typeServiceController.create);
router.get("/", typeServiceController.getAll);
router.get("/:id", typeServiceController.getOne);
router.delete("/:id", typeServiceController.delete);
router.put("/:id", typeServiceController.update);
module.exports = router;
