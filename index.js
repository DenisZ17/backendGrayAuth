require("dotenv").config();
const sequelize = require("./db");
const models = require("./models/models");
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors()); // для запросов из браузера
app.use(express.json());
app.use(cookieParser());
app.use(fileupload({}));
app.use("/api", router);
// Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // функция сверяет состояние базы данных со схемой данных
    app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
  } catch (error) {}
};

start();
