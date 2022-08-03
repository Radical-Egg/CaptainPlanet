const Sequelize = require("sequelize");
const { DB_NAME, DB_USER, DB_PASS, DB_STORAGE } = require("../../config.json");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: DB_STORAGE,
});
module.exports = sequelize;
