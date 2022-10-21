const { Service } = require("../models/models");
const uuid = require("uuid");
const ApiError = require("../error/ApiError");

class ServiceController {
  async create(req, res, next) {
    try {
      const { name, price, info, img, typeServiceId } = req.body;

      const service = await Service.create({
        name,
        price,
        img,
        info,
        typeServiceId,
      });
      return res.status(201).json(service);
    } catch (error) {
      next(ApiError.badRequest(error.message));
      return res.status(500).json({ error: error.message });
    }
  }
  async getAll(req, res, next) {
    try {
      const { typeServiceId } = req.query;
      if (!typeServiceId) {
        const services = await Service.findAll();
        return res.status(201).json(services);
      }
      if (typeServiceId) {
        const services = await Service.findAll({
          where: { typeServiceId },
        });
        return res.status(201).json(services);
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const service = await Service.findOne({
        where: { id },
      });
      return res.status(201).json(service);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Service.destroy({
        where: { id },
      });
      if (deleted) {
        return res.status(204).send("Service deleted");
      }
      throw new Error("Service not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      const { servid } = req.params;
      const [updated] = await TypeService.update(req.body, {
        where: { id: servid },
      });
      if (updated) {
        const updatedType = await TypeService.findOne({
          where: { id: typeId },
        });
        return res.status(200).json({ type: updatedType });
      }
      throw new Error("Type not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

module.exports = new ServiceController();
