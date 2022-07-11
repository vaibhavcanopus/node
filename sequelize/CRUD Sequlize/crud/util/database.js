const Sequelize = require('sequelize');

const sequelize = new Sequelize('completeNode', 'root', 'Vaibhav@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
