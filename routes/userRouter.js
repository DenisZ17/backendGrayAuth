const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

//router.use(verifyJWT);

router.post("/", userController.createNewUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
