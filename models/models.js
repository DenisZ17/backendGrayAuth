const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketService = sequelize.define("basket_service", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Service = sequelize.define("service", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true },
  info: { type: DataTypes.STRING, allowNull: true },
});

const TypeService = sequelize.define("type_service", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketService);
BasketService.belongsTo(Basket);

BasketService.hasOne(Service);
Service.belongsTo(BasketService);

TypeService.hasMany(Service);
Service.belongsTo(TypeService);

module.exports = {
  User,
  Basket,
  BasketService,
  TypeService,
  Service,
};
