const express = require("express");
const router = express.Router();

const serviceRouter = require("./serviceRouter");
const userRouter = require("./userRouter");
const typeServiceRouter = require("./typeServiceRouter");

router.use("/user", userRouter);
router.use("/service", serviceRouter);
router.use("/type", typeServiceRouter);

module.exports = router;
