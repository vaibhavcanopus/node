// const mysql =require('mysql2');
// const pool = mysql.createPool({
//     host:'127.0.0.1',
//     user:'root',
//     database:'product',
//     password:"Vaibhav@123"
// });
// module.exports =pool.promise();

const Sequelize  = require('sequelize');
const sequelize= new Sequelize('product','root','Vaibhav@123',
{dialect:'mysql',
host:'localhost'
});

module.exports = sequelize;