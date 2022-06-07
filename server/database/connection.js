const Sequelize = require('sequelize')

module.exports = new Sequelize('crud','root','1234',{
    host : 'localhost',
    dialect : 'mysql'
})