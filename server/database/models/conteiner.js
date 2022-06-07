const Sequelize = require('sequelize')
const connection = require('../connection')

const conteiner = connection.define('conteiners',{
    cliente : {type : Sequelize.STRING},
    numConteiner : {type : Sequelize.STRING},
    tipo : {type : Sequelize.INTEGER},
    status : {type: Sequelize.STRING},
    categoria : {type: Sequelize.STRING}
})

module.exports = conteiner