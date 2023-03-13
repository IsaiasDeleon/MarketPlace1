//Librerias
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql');
const cors = require('cors')
//Obtenemos los variables globales para no ponerlos en codigo
require('dotenv').config();
//Archivo donde hacemos las peticiones a la DB
const { read, readEspesifica, addCarrito } = require("./options")

//Politicas cross
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//Verificamos la conectividad
const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})

connection.connect((err)=>{
    if(err) throw err;
    console.log('Conectado a la base de datos')
})
//preparamos el pool donde van a caer todas las consultas
const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})
///Verificamos si el servidor esta funcionando
app.get('/', (req, res)=>{
    res.send("Levantando un servidor")
});
//Url de la busqueda sin esqpecificaciones
app.get('/read', (req, res)=>{
    read( pool, (result) => {
        res.json(result)
    })
})
//Url de la busqueda con espcificaciones
app.post('/PruebasBusqueda',(req, res)=> {
    readEspesifica(pool, req.body ,(result) => {
        res.json(result)
    })

})
//Url para actualizar el carrito
app.post('/carrito',(req, res)=>{
    addCarrito(pool, req.body, (result) => {
        res.json(result)
    })
})

//Levantamos el servidor en el puesto que necesitemos
app.listen(3020,()=>{
    console.log("servidor en puesto 3020");
})