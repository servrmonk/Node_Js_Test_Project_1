const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("social_media", "root", "sqllegasypassword24", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});
module.exports = sequelize;
