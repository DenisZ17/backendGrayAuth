const express = require("express");
const router = express.Router();

const serviceRouter = require("./serviceRouter");
const userRouter = require("./userRouter");
const typeServiceRouter = require("./typeServiceRouter");
const authRouter = require("./authRouter");

router.use("/users", userRouter);
router.use("/service", serviceRouter);
router.use("/type", typeServiceRouter);
router.use("/auth", authRouter);

module.exports = router;
