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
                //Obtenemos los articulos ya registrados en la DB
                articulos.every(element => {
                    //Validamos uno por uno para evr si ya se encuentra en su carrito
                    if (element == `${data2}`) {
                        suma++;
                        //Una vez que lo encuentre sumaremos la variable suma para no coorrer el siguinte codigo ademas ponemos un retur para que ya no siga validando 
                        return false;
                    }
                });
                if (suma == 0) {
                    //Seguimos utilizando el arreglo ya que es mas facil agregarlo con sus respectivas separaciones
                    articulos.push(`${data2}`);
                    let valuesArticulos = articulos.toString();
                    //Una ves ya teniendo los artivulos haremos una actualizacion en la DB
                    connection.query(`UPDATE carrito SET IdArticulos = ${valuesArticulos} where id = ${result[0].id}`, function (err, result) {
                        if (err) throw err;
                        callback(result);
                        connection.release();
                    })
                } else {
                    console.log("El producto ya fue seleccionado")
                }


                //INSERT INTO `carrito` (`id`, `idUsuario`, `IdArticulos`) VALUES (NULL, '1', '2');
            }

            connection.release();
        })
    })
}

//Exportamos las funciones que utilizaremos para la comunicacion con el front 
module.exports = { read, readEspesifica, addCarrito }