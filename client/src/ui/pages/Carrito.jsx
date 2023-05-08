import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CardCarrito } from '../components/CardCarrito';
import { Noti } from '../components/Notificaciones';
import { AuthContext } from '../../auth/AuthContext';
const URLServer = "http://192.168.100.18:3020/"


export const Carrito = ({ NumElementsCarrito,setMenu }) => {
    const { user } = useContext(AuthContext);
    let idU = user?.id;
    const [elementsCarrito, setElementsCarrito] = useState([]);
    const [numArticulos, setNumArticulos] = useState(0);
    const [totalPrecio, setTotalPrecio] = useState(0);
    const [notiCarrito, setNotiCarrito] = useState();
    const [activeNoti, setActiveNoti] = useState();

    //Function para obtener los elementos en el carrito
    function getItemCarrito() {
        if( idU !== undefined ){
            axios.post(URLServer + "readCarrito",{"idU": idU}).then((response) => {
                //Si la respuesta es correacta modificaremos el array con los objetos que obtenga desde la busqueda
                setElementsCarrito(response.data)
            });
        }
    }

    //Hacemos una peticion para obtener los primero resultados que mostraremos
    useEffect(() => {
        //Peticion para obtener los elemtos del carrito
        getItemCarrito();
        Totales()
        setMenu(2)
    }, [])

    //Funcion para eliminar elemento del carrito enviamos el id del elemento clickeado
    function DeletItem(id) {
        if( idU !== undefined ){
            axios.post(URLServer + "deleteItem", {"idU":idU, "id": id }).then((response) => {
                //Si la operacion se hizo correctamente nos regresara Eliminado
                if (response.data == "Eliminado") {
                    //Mandamos a llamar a la funcion de getItemCarrito para obtener la actualizacion de los elementos 
                    getItemCarrito()
                    //Llamamos a la funcion NumELementsCarrito para obtener ka actualizacion de los elementos en el carrito
                    NumElementsCarrito()
                    //Enviamos el mensaje a las notificaciones para mostrar la alerta al usuario
                    setNotiCarrito(response.data)
                    setActiveNoti(true)
                    setTimeout(() => {
                        setActiveNoti(false)
                    }, 4000);
                    //Llamamos a la funcion de totales para actualizar la cantida de productos y el total del precio
                    Totales()
                }
            });
        }
    }
    function Totales() {
        if(idU !== undefined){
            //Hacemos la peticion de los datos al modelo  el cual obtendra los elementos y su precio 
            axios.post(URLServer + "readCarrito",{"idU":idU}).then((response) => {
                let num = 0;
                let total = 0;
                //recorremos los datos que nos arrojo para poder hacer una sumatoria del precio y los elementos ya que el usuario tendra la opcion de elegir la cantidad de stock que necesite
                response.data.map((elementsCarrito) => {
                    let element;
                    try {
                        element = document.getElementById(`VItem${elementsCarrito.id}`).value;
                    } catch (error) {
                        element = 1;
                    }

                    //Validamos que no venga vacio
                    if (element == "") {
                        element = 0;
                    }

                    // Lo parseamos ya que necesitamos un tipo numerico
                    element = parseInt(element);
                    let multi = 0;
                    if(elementsCarrito.Oferta === 1){
                        multi = elementsCarrito.montoOferta * element;
                    }else{
                        multi =  elementsCarrito.monto * element;
                    }
                    
                    total = total + multi;

                    //Sumamos las cantidades que se píden 
                    num = num + element;
                })
                setNumArticulos(num)
                setTotalPrecio(total)

            })
        }
       
    }
    function Cotizar() {
        let ids = [];
        let cantidadByProducto = [];
        elementsCarrito.map((element) => {
            ids.push(element.id);
            let elements = document.getElementById(`VItem${element.id}`).value;
            cantidadByProducto.push(elements);
        });
        if(idU !== undefined){
            axios.post(URLServer+"GeneratePDFArticulos",{"idProduct":ids, "cantidades": cantidadByProducto, "idUser": idU}).then((response) => {
                axios.post(URLServer+'CotizacionUnitaria',{
                    pdf:response.data
                }, {
                    responseType: 'blob'
                }).then(response => {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
            
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'Cotizacion.pdf');
                    
                  document.body.appendChild(link);
                    
                  link.click();
                });
            })
        }
        
    }
    return (
        <>
            <div className="contenedorCarrito" style={{ "overflowY": "auto" }}>
                {elementsCarrito.map((elementsCarrito) => (
                    <CardCarrito key={elementsCarrito.id} {...elementsCarrito} DeletItem={DeletItem} variable={`VItem${elementsCarrito.id}`} Totales={Totales} />
                ))}
            </div>
            <div className='ContenedorBottonTotales'>
                <hr style={{ "width": "95%", "margin": "0", "marginLeft": "2.5%" }} />
                <div className="d-flex justify-content-evenly align-items-center" style={{ "height": "95%" }}>
                    <div className=" text-center">
                        <h5 className='TotalesFont text-white'>Total de productos:</h5>
                        <h4 className="fw-bold text-secondary TotalesFont  text-white">{numArticulos}</h4>
                    </div>
                    <div className=" text-center">
                        <h5 className='TotalesFont text-white'>Precio total:</h5>
                        <h4 className=" fw-bold text-success TotalesFont">${totalPrecio}</h4>
                    </div>
                    <div className=" text-center">
                        <button className="btn btn-success btn-lg m-2">Comprar</button>
                        <button className="btn btn-light btn-lg m-2" onClick={ () => Cotizar()}>Cotizar</button>
                    </div>
                </div>
            </div>
            <Noti notiCarrito={notiCarrito} activeNoti={activeNoti} />
        </>

    )
}