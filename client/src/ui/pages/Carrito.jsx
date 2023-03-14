import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardCarrito } from '../components/CardCarrito';
const URLServer = "http://192.168.100.22:3020/"

export const Carrito = () => {
    const [elementsCarrito, setElementsCarrito] = useState([]);
    
    //Function para obtener los elementos en el carrito
    function getItemCarrito(){
        axios.get(URLServer+"readCarrito").then((response) => {
            //Si la respuesta es correacta modificaremos el array con los objetos que obtenga desde la busqueda
            setElementsCarrito(response.data)
        });
    }

    //Hacemos una peticion para obtener los primero resultados que mostraremos
    useEffect(()=>{
        //Peticion para obtener los elemtos del carrito
        getItemCarrito()
    },[])

    function DeletItem(id){
        axios.post(URLServer+"deleteItem",{"id":id}).then((response) => {

        });
    }
    return (
        <>
            <div className="contenedorCarrito"> 
            {elementsCarrito.map((elementsCarrito) => (
                <CardCarrito key={elementsCarrito.id} {...elementsCarrito} DeletItem={DeletItem} />
            ))} 
            </div>
            <div style={{ "position": "absolute", "bottom": "0", "left": "20%", "width": "80%", "height": "120px" }}>
                <hr style={{ "width": "95%", "margin": "0", "marginLeft": "2.5%" }} />
                <div className="d-flex justify-content-evenly align-items-center" style={{ "height": "95%" }}>
                    <div className=" text-center">
                        <h5>Total de productos:</h5>
                        <h4 className="fw-bold text-secondary">2</h4>
                    </div>
                    <div className=" text-center">
                        <h5>Precio total:</h5>
                        <h4 className=" fw-bold text-success">$3500.00</h4>
                    </div>
                    <div className=" text-center">
                        <button className="btn btn-success btn-lg">Comprar</button>
                    </div>
                </div>
            </div>

        </>

    )
}