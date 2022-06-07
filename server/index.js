const express = require('express')
const app = express()
const cors = require('cors')
const Sequelize = require('sequelize')
const port = 9000
const connection = require('./database/connection')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Conexão Com o Banco de Dados
connection.authenticate()
    .then(()=> console.log('CONECTADO AO BANCO DE DADOS'))
    .catch(err => console.log(err))

//Models
const conteiner = require('./database/models/conteiner')

//EndPoints

/* CREATE */
app.post('/conteiner',(req, res)=>{
    let {cliente, numConteiner, tipo, status, categoria} = req.body

    conteiner.create({
        cliente,
        numConteiner,
        tipo,
        status,
        categoria
    })
    .then(()=> res.sendStatus(200))
    .catch(err => {
        res.sendStatus(500)
        console.log(err)
    })
})

/*READ */
app.get('/conteiner',(req,res)=>{
    conteiner.findAll()
    .then(data => res.json(data))
    .catch(err => {
        res.sendStatus(500)
        console.log(err)
    })
})

/* UPDATE */
app.put('/conteiner/:id',(req, res)=>{
    let { id } = req.params
    let {cliente, numConteiner, tipo, status, categoria} = req.body

        if(cliente != undefined){
            conteiner.update({cliente},{where: {id : id}})
        }
        if(numConteiner != undefined){
            conteiner.update({numConteiner},{where: {id : id}})
        }
        if(tipo != undefined){
            conteiner.update({tipo},{where: {id : id}})
        }
        if(status != undefined){
            conteiner.update({status},{where: {id : id}})
        }
        if(categoria != undefined){
            conteiner.update({categoria},{where: {id : id}})
        }
        res.sendStatus(200)
})

/* DELETE */
app.delete('/conteiner/:id',(req, res)=>{
    let { id } = req.params
   
    conteiner.destroy({where :{id : id}})
    .then(()=> res.sendStatus(200))
    .catch(err => {
        res.sendStatus(500)
        console.log(err)
    })
})


app.listen(port, ()=>{
    console.log('Servidor aberto na porta ' + port)
})