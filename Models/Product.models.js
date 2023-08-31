const sequelize = require("sequelize");
const { seq } = require("../Config/db");

const Product = seq.define("Product", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: sequelize.TEXT,
    allowNull: false,
  },
  categoryId: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "categories",
      key: "id",
    },
  },
  availability: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
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

module.exports = { Product };
