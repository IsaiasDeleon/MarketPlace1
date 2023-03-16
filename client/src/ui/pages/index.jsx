import axios from 'axios';
import { useEffect, useState } from 'react';

import { Card } from "../components/Cards";
import { Noti } from '../components/Notificaciones';

const URLServer = "http://192.168.100.22:3020/"


export const Inicio = ({ data, setData, NumElementsCarrito, dataFiltrado, setMenu }) => {

    const [idCard, setIdCard] = useState();
    const [notiCarrito, setNotiCarrito] = useState();
    const [activeNoti, setActiveNoti] = useState();



    useEffect(() => {
        //Comrpobamos que el idCard no venga vacio
        if (idCard != undefined) {
            //Peticion para agregar un nuevo producto al carrito
            axios.post(URLServer + "carrito", { "Num": idCard }).then((response) => {
                //Actualizamos el mensaje que nos envio el server para mostarr la alerta
                setNotiCarrito(response.data)
                //Activamos y desactivamos la alerta para tener una animacion
                setActiveNoti(true)
                setTimeout(() => {
                    setActiveNoti(false)
                }, 4000);
                NumElementsCarrito()
            })
        }
    }, [idCard])
    //Hacemos una peticion para obtener los primero resultados que mostraremos
    useEffect(() => {
        //Peticion para obtener los productos en inicio
        axios.get(URLServer + "read").then((response) => {
            //Si la respuesta es correacta modificaremos el array con los objetos que obtenga desde la busqueda
            setData(response.data)
        });
        setMenu(true);
    }, [])


    const data2 = [
        {
            id: 1,
            img: 5,
            empresa: "Badger",
            descripcion: "Tenis Puma Junior Unisex St Activate Zapato Deportivo Comodo",
            estrellas: 4,
            monto: 200
        },
        {
            id: 2,
            img: 6,
            empresa: "Badger",
            descripcion: "Lentes De Sol Hombre Polarizados Clásicos Uv400 De Piloto",
            estrellas: 2,
            monto: 100
        },
        {
            id: 3,
            img: 7,
            empresa: "Aplintec",
            descripcion: "Reloj Tsar Bomba Hombre Lujo Tonneau Cronógrafo Impermeable",
            estrellas: 5,
            monto: 100
        },
        {
            id: 4,
            img: 8,
            empresa: "Badger",
            descripcion: "Reloj Tsar Bomba Hombre Lujo Tonneau Cronógrafo Impermeable",
            estrellas: 5,
            monto: 700
        }
    ];

    return (
        <div className="contenedorIndex">
            <div className="padding4 contendorPrincipalIndex">
                <h2 className="TtitulosIndex">Ofertas especiales</h2>
                <div className="padding3Index contendorPrincipalIndexGrid">
                    <div className=" text-white padding3Index divImg">
                        <div className="divImgsText">
                            <h2 className="fw-bold TextSinShadowH h2Font" >La mejor calidad en nuestros productos.</h2>
                            <p className="pFont" style={{ "fontWeight": "500" }}>Nuestro compromiso es brindar la mejor solución para aumentar al máximo la eficiencia de los procesos de nuestros clientes</p>
                            <button className="btn" style={{ "background": "#F1C40F" }}>Ver mas..</button>
                        </div>
                    </div>
                    <div className=" text-dark padding3Index divImg2">
                        <div className="divImgsText">
                            <h2 className="fw-bold TextSinShadowH h2Font" >Descuentos del 50%</h2>
                            <p className="pFont" style={{ "fontWeight": "500" }}>Ven y conoce nuestros productos que estan en descuento.</p>
                            <button className="btn" style={{ "background": "#F1C40F" }}>Ver mas..</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="padding4 contendorArticulo" >
                <div className='m-2'>
                    <h2 className="TtitulosIndex">Articulos filtrados</h2>
                    <div className="d-flex ProbandoScroll contenedorCards" style={{ "overflowX": "scroll" }}>
                        {dataFiltrado.map((data) => (
                            <Card key={data.id} {...data} setIdCard={setIdCard} />
                        ))}
                    </div>
                </div>
                <div className="m-2" >
                    <h2 className="TtitulosIndex">Articulos mas vendidos</h2>
                    <div className="d-flex ProbandoScroll contenedorCards" style={{ "overflowX": "scroll" }}>
                        {data.map((data) => (
                            <Card key={data.id} {...data} setIdCard={setIdCard} />
                        ))}
                    </div>
                </div>
                <div className="m-2">
                    <h4>Nuevos articulos</h4>
                    <div className="d-flex  ProbandoScroll contenedorCards " style={{ "overflowX": "scroll" }}>
                        {data2.map((d) => (
                            <Card key={d.id} {...d} />
                        ))}
                    </div>
                </div>


            </div>
            <Noti notiCarrito={notiCarrito} activeNoti={activeNoti} />
        </div>

    )
}