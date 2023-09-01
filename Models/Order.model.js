const sequelize = require("sequelize");
const { seq } = require("../Config/db");
const { Cart } = require("./Cart.model");

const Order = seq.define("Order", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  cartId: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "carts",
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

Order.belongsTo(Cart, {
  foreignKey: "cartId",
})

module.exports= {Order}