const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const scheduledMeeting = sequelize.define("scheduledMeeting", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  mentorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  candidateName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  joinLink:{
    type:DataTypes.STRING,
    allowNull:false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  slotId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = scheduledMeeting;
