const sequelize = require("sequelize");
const { seq } = require("../Config/db");
const { Product } = require("./Product.models");

const Cart = seq.define("Cart", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  productId: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
    },
  },
  userId: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  quantity: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  createdAt: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
  updatedAt: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
});

Cart.belongsTo(Product, {
  foreignKey: "productId",
})

module.exports= {Cart}