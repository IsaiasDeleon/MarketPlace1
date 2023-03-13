const mysql = require('mysql');
//Primera busqueda sin especificaciones
function read(pool,callback){
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query("SELECT * FROM articulos", function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        })
    })
}
//Busqueda especifica
function readEspesifica (pool, data,callback){
    let con = "";
    let articulos = "";
    let array = [];
    
    if(data.Bad){
        con = ` AND empresa = 'Badger'`;
    }
    if(data.Apl){
        con = con +` AND empresa = 'Aplintec'`;
    }
    if(data.Bad && data.Apl){
        con = ` AND empresa in ('Badger','Aplintec')`;
    }
    if(data.Celular){
        array.push("'Celular'");
    }
    if(data.Pantallas){
        array.push("'Pantallas'");
    }
    if(data.Calzado){
        array.push("'Calzado'");
    }
    if(data.Muebles){
        array.push("'Muebles'");
    }
    if(data.Otros){
        array.push("'Otros'")
    }
    console.log(data.value[0])

    if(array.length > 0){
        articulos = array.toString();
        articulos = ` AND Categoria in (${articulos})`;
    }
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(`select * from articulos where Estatus = 1 ${con} ${articulos} AND monto between ${data.value[0]} and ${data.value[1]} `, function(err,result){
            if(err) throw err;
            callback(result);
            connection.release();
        })
    })
}


//Exportamos las funciones que utilizaremos para la comunicacion con el front 
module.exports = { read, readEspesifica }