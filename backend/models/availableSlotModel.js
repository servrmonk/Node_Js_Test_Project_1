const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const availableSlot = sequelize.define("availableSlot", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  slot: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  slotId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = availableSlot;

// name: "Mohan",
//       time: "2:50pm",
//       slot: 9,
//       slotId
