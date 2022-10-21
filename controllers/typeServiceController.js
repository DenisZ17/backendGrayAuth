const { TypeService } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeServiceController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const type = await TypeService.create({ name });
      return res.status(201).json(type);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const types = await TypeService.findAll();
      return res.json(types);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const type = await TypeService.findOne({ where: { id } });
      return res.json(type);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const { typeId } = req.params;
      const [updated] = await TypeService.update(req.body, {
        where: { id: typeId },
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

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await TypeService.destroy({
        where: { id },
      });
      if (deleted) {
        return res.status(204).send("Type deleted");
      }
      throw new Error("Type not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

module.exports = new TypeServiceController();
