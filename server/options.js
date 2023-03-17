const mysql = require('mysql');
//Primera busqueda sin especificaciones
function read(pool, callback) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM articulos", function (err, result) {
            if (err) throw err;
            callback(result);
            connection.release();
        })
    })
}
//Busqueda especifica
function readEspesifica(pool, data, callback) {
    let con = "";
    let articulos = "";
    let array = [];

    if (data.Bad) {
        con = ` AND empresa = 'Badger'`;
    }
    if (data.Apl) {
        con = con + ` AND empresa = 'Aplintec'`;
    }
    if (data.Bad && data.Apl) {
        con = ` AND empresa in ('Badger','Aplintec')`;
    }
    if (data.Celular) {
        array.push("'Celular'");
    }
    if (data.Pantallas) {
        array.push("'Pantallas'");
    }
    if (data.Calzado) {
        array.push("'Calzado'");
    }
    if (data.Muebles) {
        array.push("'Muebles'");
    }
    if (data.Otros) {
        array.push("'Otros'")
    }

    if (array.length > 0) {
        articulos = array.toString();
        articulos = ` AND Categoria in (${articulos})`;
    }
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(`select * from articulos where Estatus = 1 ${con} ${articulos} AND monto between ${data.value[0]} and ${data.value[1]} `, function (err, result) {
            if (err) throw err;
            callback(result);
            connection.release();
        })
    })
}
//Añadimos el articulo al carrito
function addCarrito(pool, data, callback) {
    const data2 = data.Num;
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        //Validamos que exista el usuario en el carrito
        connection.query(`SELECT id, count(id) as num, IdArticulos FROM carrito where idUsuario = 1`, function (err, result) {
            // console.log(result[0].num)
            if (err) throw err;
            if (result[0].num == 0) {
                // si no se encontro el usuario debera insertar un nuevo carrito
                callback("Registar")
            }
            if (result[0].num == 1) {
                ///Si existe el carrito del usuario validaremos que no este el articulo ya registrado en su carrito
                let articulos = result[0].IdArticulos.split(',');
                let suma = 0;
                console.log(articulos)
                //Obtenemos los articulos ya registrados en la DB
                for (let i = 0; i < articulos.length; i++) {
                    //Validamos uno por uno para evr si ya se encuentra en su carrito
                    if (articulos[i] == `${data2}`) {
                        suma++;
                        //Una vez que lo encuentre sumaremos la variable suma para no coorrer el siguinte codigo ademas ponemos un retur para que ya no siga validando 
                        break;
                    }
                }

                if (suma == 0) {
                    //Seguimos utilizando el arreglo ya que es mas facil agregarlo con sus respectivas separaciones
                    articulos.push(`${data2}`);
                    let valuesArticulos = articulos.toString();
                    //Una ves ya teniendo los artivulos haremos una actualizacion en la DB
                    connection.query(`UPDATE carrito SET IdArticulos = '${valuesArticulos}' where id = ${result[0].id}`, function (err, result) {
                        if (err) throw err;
                        callback("Agregado");

                    })
                } else {
                    callback("Existe")
                }


                //INSERT INTO `carrito` (`id`, `idUsuario`, `IdArticulos`) VALUES (NULL, '1', '2');
            }

            connection.release();
        })
    })
}

//Obtenemos el numero de elementos en el carrito
function ElementsToCar(pool, callback) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("SELECT IdArticulos FROM carrito where idUsuario = 1 ", function (err, result) {
            if (err) throw err;
            let articulos = result[0].IdArticulos.split(',');
            let suma = 0;
            for (let i = 0; i < articulos.length; i++) {
                //Validamos que sea mayor a 0 ya que si se encuentra vacio aqui lo podremos eliminar
                if (articulos[i] > 0) {
                    suma++;
                }
            }
            callback(suma);
            connection.release();
        })
    })
}

function readCarrito(pool, callback) {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("select IdArticulos from carrito where idUsuario = 1", function (err, result) {
            if (err) throw err;
            let articulos = result[0].IdArticulos.split(',');
            let newArr = [];

            for (let i = 0; i < articulos.length; i++) {
                //Validamos que sea mayor a 0 ya que si se encuentra vacio aqui lo podremos eliminar
                if (articulos[i] > 0) {

                    newArr.push(`${articulos[i]}`);
                }
            }

            if (newArr.length > 0) {

                let valuesArticulos = newArr.toString();
                connection.query(`Select * from articulos where id in (${valuesArticulos})`, function (err, result) {
                    if (err) throw err;
                    callback(result);
                    connection.release();
                })
            }

        })
    })
}

function deleteItem(pool, data, callback) {
    const iden = data.id;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('select IdArticulos From carrito where idUsuario = 1', function (err, result) {
            if (err) throw err;
            let articulos = result[0].IdArticulos.split(',');
            articulos = articulos.filter((item) => item !== `${iden}`)
            let newArr = [];
            for (let i = 0; i < articulos.length; i++) {
                //Validamos que sea mayor a 0 ya que si se encuentra vacio aqui lo podremos eliminar
                if (articulos[i] > 0) {
                    newArr.push(`${articulos[i]}`);
                }
            }

            if (newArr.length > 0) {
                // el update va aqui
                let valuesArticulos = newArr.toString();
                //Una ves ya teniendo los artivulos haremos una actualizacion en la DB
                connection.query(`UPDATE carrito SET IdArticulos = '${valuesArticulos}' where idUsuario = 1`, function (err, result) {
                    if (err) throw err;
                    callback("Eliminado")
                })
            }

            connection.release();
        })
    })
}
function getEstado(pool, callback){
    pool.getConnection(function (err, connection){
        if(err) throw err;
        connection.query("SELECT * FROM estados", function (err, result) {
            if (err) throw err;
            callback(result);
            connection.release();
        })
    })
}
function getMunicipio(pool, data, callback){
    const idEstado = data.Estado;
    pool.getConnection(function (err, connection){
        if(err) throw err;
        connection.query(`select * from municipios where id in (SELECT municipios_id FROM estados_municipios where estados_id = ${idEstado})`,function (err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        })
        
    })
}
function getDatosGenerales(pool, data, callback){
    const idUsuario = data.IdUsuario;
    pool.getConnection(function (err, connection){
        if(err) throw err;
        connection.query(`select dg.telefono, dg.pais, dg.estado, dg.municipio, dg.Direccion, dg.CP, u.Nombre, u.Correo, u.Password, u.img from datosgenerales dg, usuarios u where u.id = ${idUsuario} and dg.idusuario = ${idUsuario}`, function (err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        })
    })
}
//Exportamos las funciones que utilizaremos para la comunicacion con el front 
module.exports = { read, readEspesifica, addCarrito, ElementsToCar, readCarrito, deleteItem, getEstado, getMunicipio, getDatosGenerales }