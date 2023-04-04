//Librerias
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql');
const cors = require('cors')
//Obtenemos los variables globales para no ponerlos en codigo
require('dotenv').config();
//Archivo donde hacemos las peticiones a la DB
const { read, readEspesifica, addCarrito, ElementsToCar, readCarrito, deleteItem, getEstado, getMunicipio, getDatosGenerales, getNameEstado, getNameMunicipio, saveUbicacion, getCompras, Loguear } = require("./options")

//Politicas cross
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//Verificamos la conectividad
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos')
})
//preparamos el pool donde van a caer todas las consultas
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})
///Verificamos si el servidor esta funcionando
app.get('/', (req, res) => {
    res.send("Levantando un servidor")
});
//Url de la busqueda sin esqpecificaciones
app.get('/read', (req, res) => {
    read(pool, (result) => {
        res.json(result)
    })
})
//Url de la busqueda con espcificaciones
app.post('/PruebasBusqueda', (req, res) => {
    readEspesifica(pool, req.body, (result) => {
        res.json(result)
    })

})
//Url para actualizar el carrito
app.post('/carrito', (req, res) => {
    addCarrito(pool, req.body, (result) => {
        res.json(result)
    })
})
//Url para obtener cuantos articulos se encuentran en el carrito de compras
app.post('/GetNumCarrito', (req, res) => {
    ElementsToCar(pool, req.body, (result) => {
        res.json(result)
    })
})
//Url para obtener los elementos del carrito
app.post('/readCarrito', (req, res) => {
    readCarrito(pool, req.body,(result) => {
        res.json(result)
    })
})
//Url para eliminar el item que el usuario ya no quiere en su carrito
app.post('/deleteItem', (req, res) => {
    deleteItem(pool, req.body, (result) => {
        res.json(result)
    })
})
//Url para obtener la lista de los estados
app.get('/getEstado', (req, res) => {
    getEstado(pool,(result) => {
        res.json(result)
    })
})
//Url para obtener la lista de los municipios por estado
app.post('/getMunicipio', (req, res) => {
    getMunicipio(pool,req.body,(result) => {
        res.json(result)
    })
})
//Url para obtener los datos generales
app.post('/getDatosGenerales', (req, res) => {
    getDatosGenerales(pool,req.body,(result) => {
        res.json(result)
    })
})
//Url para obtener el nombre del estado seleccionado
app.post('/getNameEstado', (req, res) => {
    getNameEstado(pool, req.body, (result) => {
        res.json(result);
    })
})
//Url para obtener el nombre del municipio seleccionado
app.post('/getNameMunicipio', (req, res) => {
    getNameMunicipio(pool, req.body, (result) => {
        res.json(result);
    })
})
//Url para guardar la ubicacion del cliente
app.post('/saveUbicacion', (req, res) => {
    saveUbicacion(pool, req.body, (result) => {
        res.json(result);
    })
})
//Url para obtener el historico de compras
app.post('/getCompras', (req, res) => {
    getCompras(pool, req.body, (result) => {
        res.json(result);
    })
})
//Url para login
app.post('/Login', (req, res) => {
    Loguear(pool, req.body, (result) => {
        res.json(result);
    })
})
//Levantamos el servidor en el puesto que necesitemos
app.listen(3020, () => {
    console.log("servidor en puerto 3020");
})