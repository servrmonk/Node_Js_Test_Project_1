const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const createPostModel = sequelize.define("createPostModel", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});
module.exports = createPostModel;
