const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

class UserController {
  getAllUsers = async (req, res, next) => {
    try {
      const users = await User.findAll();
      if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
      }
      return res.status(201).json(users);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  };

  getUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id },
      });
      return res.json(user);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  };

  // create New User

  createNewUser = async (req, res, next) => {
    const { username, email, password, role, isActive } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate username
    const candidate = await User.findOne({
      where: { email },
    });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const user = await User.create({
      username,
      email,
      password: hashedPwd,
      role,
      isActive,
    });
    const basket = await Basket.create({ userId: user.id });
    if (user) {
      //created
      res.status(201).json({ message: `New user ${username} created` });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params; // Confirm data
      const deleted = await User.destroy({
        where: { id },
      });
      if (deleted) {
        return res.status(204).send("User deleted");
      }

      throw new Error("User not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
}

module.exports = new UserController();
