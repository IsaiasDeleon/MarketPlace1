const mysql = require('mysql');
const nodemailer = require('nodemailer');


function mailNode(pool, data, callback){
    const idProducto = data.idProduct;
    const idUsuario = data.idUser;
    const oferta = data.Oferta;
    pool.getConnection(function ( err, connection) {
        if (err) throw err;
        connection.query(`SELECT articulos.img, articulos.descripcion, articulos.monto, usuarios.Nombre, usuarios.Correo from articulos, usuarios where articulos.id = ${idProducto} and usuarios.id= ${idUsuario}`, function (err, result) {
            if(err) throw err;
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "isaiasdeleonsalazar@gmail.com",
                    pass: "ffkpwptjzakksjmq"
                }
            });
            
            const mailOptions = {
                from: 'isaiasdeleonsalazar@gmail.com',
                to: 'deleonsalazaru@gmail.com',
                subject: 'Asunto del correo',
                html: `
                <h1 style="width:100%; text-align:center; background:#221e1d; color:#fff">Market place <b style="color:#F1C40F">B</b><b style="color:#2980B9">A</b></h1>
                <h2 style="font-weight:400; width:80%; margin-left:10%; color:#000"> Buen día proveedor <b>BADGER AUTOMATION</b> tiene una nueva oferta del usuario: <b> ${result[0].Nombre} </b> sobre el producto <b> ${result[0].descripcion} </b> </h2>
                <table style="width:100%">
                    <tr>
                        <td style="width:40%; text-align:right"><img src="https://isc.isaiasdeleon.robo-tics-slp.net/resources/Art${result[0].img}.png"style="width:280px;"/> </td>
                        <td style="width:60%">
                            <h2>Precio inicial: <b style="color:#2980B9">$${result[0].monto} MXN</b></h2>
                            <h2>Precio ofertado: <b style="color:#27AE60">$${oferta} MXN </b></h2> 
                            <div style="display: inline">
                                <a style="padding:14px; font-size:18px; margin:5px; background:#212529; color:#fff; border:none; border-radius:5px; text-decoration:none" href="https://badgerautomation.com/"> Aceptar oferta</a>
                                <a style="padding:14px; font-size:18px; margin:5px; background:#6c757d; color:#fff; border:none; border-radius:5px;" href=""> Hacer contra oferta </a>
                            </div>
                        <td>
                    </tr>
                </table>
                `
                
            };
            
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Correo enviado: ' + info.response);
                }
            });
        })
    })
   
}
//Exportamos las funciones que utilizaremos para la comunicacion con el front 
module.exports = { mailNode }