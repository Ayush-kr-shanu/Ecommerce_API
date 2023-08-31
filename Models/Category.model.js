const sequelize = require("sequelize");
const { seq } = require("../Config/db");

const Category = seq.define("Category", {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
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
  
  module.exports = {Category};