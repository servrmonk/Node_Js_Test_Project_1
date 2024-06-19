const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('meeting_management','root','sqllegasypassword24',{
    dialect:"mysql",
    host:'localhost',
    logging: false, // Disable SQL query logging
});

module.exports = sequelize;