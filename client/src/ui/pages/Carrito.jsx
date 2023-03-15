import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardCarrito } from '../components/CardCarrito';
import { Noti } from '../components/Notificaciones';
const URLServer = "http://192.168.100.22:3020/"

export const Carrito = ({ NumElementsCarrito }) => {
    const [elementsCarrito, setElementsCarrito] = useState([]);
    const [numArticulos, setNumArticulos] = useState(0);
    const [totalPrecio, setTotalPrecio] = useState(0);
    const [notiCarrito, setNotiCarrito] = useState();
    const [activeNoti, setActiveNoti] = useState();

    //Function para obtener los elementos en el carrito
    function getItemCarrito() {
        axios.get(URLServer + "readCarrito").then((response) => {
            //Si la respuesta es correacta modificaremos el array con los objetos que obtenga desde la busqueda
            setElementsCarrito(response.data)


        });
    }

    //Hacemos una peticion para obtener los primero resultados que mostraremos
    useEffect(() => {
        //Peticion para obtener los elemtos del carrito
        getItemCarrito();
        Totales()
    }, [])

    function DeletItem(id) {
        axios.post(URLServer + "deleteItem", { "id": id }).then((response) => {
            if (response.data == "Eliminado") {
                getItemCarrito()
                NumElementsCarrito()

                setNotiCarrito(response.data)
                setActiveNoti(true)
                setTimeout(() => {
                    setActiveNoti(false)
                }, 4000);
                Totales()
            }
        });
    }
    function Totales() {

        axios.get(URLServer + "readCarrito").then((response) => {

            let num = 0;
            let total = 0;
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
                let multi = elementsCarrito.monto * element;
                total = total + multi;

                //Sumamos las cantidades que se píden 
                num = num + element;
            })
            setNumArticulos(num)
            setTotalPrecio(total)

        })




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
                        <h5>Total de productos:</h5>
                        <h4 className="fw-bold text-secondary">{numArticulos}</h4>
                    </div>
                    <div className=" text-center">
                        <h5>Precio total:</h5>
                        <h4 className=" fw-bold text-success">${totalPrecio}</h4>
                    </div>
                    <div className=" text-center">
                        <button className="btn btn-success btn-lg">Comprar</button>
                    </div>
                </div>
            </div>
            <Noti notiCarrito={notiCarrito} activeNoti={activeNoti} />
        </>

    )
}