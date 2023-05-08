import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { Card } from "../components/Cards";
import { Noti } from '../components/Notificaciones';
import { BtnProducto } from '../components/buttonProducto';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router';
import { CardHorizontal } from '../components/CardsHorizontal';
import { BtnMisProductos } from '../components/butttonMisProductos';
import { useForm } from '../../hooks/useForm';

const URLServer = "http://192.168.100.18:3020/"


export const Inicio = ({ data = [], setData, NumElementsCarrito = [], dataFiltrado = [], setMenu, ElementsGustos, NumElementsGustos, setClickProducto, acomodoCars, setAcomodoCards, setFiltros, filtros }) => {

    const [idCard, setIdCard] = useState();
    const [notiCarrito, setNotiCarrito] = useState();
    const [activeNoti, setActiveNoti] = useState();
    const { user } = useContext(AuthContext)
    let idU = user?.id;
    let tipoUser = user?.tipoUser;
    const navigate = useNavigate(); 

    function Cambio (e){
        setFiltros({...filtros, Estado : e.target.value})
    }
    useEffect(() => {
        
        //Comrpobamos que el idCard no venga vacio
        if (idCard != undefined) {
            if(idU == undefined){
                navigate("/Login",{
                    replace:true
                })
                return;
            }
            //Peticion para agregar un nuevo producto al carrito
            axios.post(URLServer + "gustos", { "idU": idU,"Num": idCard }).then((response) => {
                //Actualizamos el mensaje que nos envio el server para mostarr la alerta
                setNotiCarrito(response.data)
                //Activamos y desactivamos la alerta para tener una animacion
                setActiveNoti(true)
                setTimeout(() => {
                    setActiveNoti(false)
                }, 4000);
                // NumElementsCarrito();
                NumElementsGustos();
                ElementsGustos();

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
        setMenu(1);
    }, [])
   useEffect(() => {
    localStorage.setItem('AcomodoCards', JSON.stringify(acomodoCars))
   },[acomodoCars])
console.log(dataFiltrado)
    return (
        <div className="contenedorIndex">
            {/* <div className="padding4 contendorPrincipalIndex">
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

            </div> */}
           
            <div className="padding4 contendorArticulo" >
            <button className='btn btn-dark' onClick={() => setFiltros({...filtros,Oferta:0 })}>Todos</button>
            <button className='btn btn-dark m-2' onClick={() => setFiltros({...filtros,Oferta:1 })}>Ofertas</button>
            <div className="form-floating SelectEstadoProducto" style={{"display":"inline-block","position":"absolute"}}>
                <select className="form-select" onChange={(e) => Cambio(e)}  aria-label="Floating label select example">
                    <option value="3" selected>Cualquier estado</option>
                    <option value="1">Nuevo</option>
                    <option value="2">Usado</option>
                </select>
                <label htmlFor="floatingSelect" className='fw-bold'>Estado del producto:</label>
            </div>
            <div className='OrdenarProductos' >
                {
                    !acomodoCars ?
                        <label className='fw-bold'>Ordenar por lista <button className='btn btn-dark' onClick={ (e) => setAcomodoCards(!acomodoCars)}><i className="bi bi-list-ol"></i></button></label>
                        :<label className='fw-bold'>Ordenar por galeria <button className='btn btn-dark' onClick={ (e) => setAcomodoCards(!acomodoCars)}><i className="bi bi-card-text"></i></button></label>
                }
                
                
            </div>
            
                <div className='m-2'>
                    {/* <h2 className="TtitulosIndex">Articulos filtrados</h2> */}
                    <div className={!acomodoCars ? "contenedorCards" : "contenedorCardsList"} >
                        
                        {!acomodoCars?
                            dataFiltrado.map((data) => (
                               
                                <Card key={data.id} {...data} setIdCard={setIdCard} setClickProducto={setClickProducto} />
                            ))
                            :dataFiltrado.map((data) => (
                                <CardHorizontal key={data.id} {...data} setIdCard={setIdCard} setClickProducto={setClickProducto} />
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                tipoUser == "2"?
                <>
                    <BtnProducto/>
                    <BtnMisProductos/>
                </>
                    
                :
                <></>
            }
           
            <Noti notiCarrito={notiCarrito} activeNoti={activeNoti} />
        </div>

    )
}