import { useState, useEffect, useContext } from "react";
import axios from 'axios';

import { Navigate, Route, Routes } from "react-router-dom";
import { Head } from "../ui/components/Head";
import { Menu } from "../ui/components/Menu";
import { Inicio } from "../ui/pages";
import { Carrito } from "../ui/pages/Carrito";
import { Head2 } from "../ui/components/Head2";
import { EditarPerfil } from "../ui/pages/EditarPerfil";
import { Login } from "../ui/pages/Login";
import { AuthContext } from "../auth/AuthContext";


const URLServer = "http://192.168.100.10:3020/"
export const AppM = () => {
    //Obtenemos el id logueado
    const { user } = useContext( AuthContext );
    let idU = user?.id;
   
    //Global estado de menu
    const [estadoMenu, setEstadoMenu] = useState(false);
    //Get data 
    const [data, setData] = useState([])
    //Data de filtros
    const [dataFiltrado, setDataFiltrado] = useState([])
    //Get Numero de articulos en el carrito
    const [numArticulos, setNumArticulos] = useState(0);

    //Identificador para ver si quitamos el menu y cambiamos de head
    const [menu, setMenu] = useState(false);
    
   
    
    function NumElementsCarrito() {
       
        //Peticion para obtener el numero de productosque tiene en el carrito
        axios.post(URLServer + "GetNumCarrito",{"id":idU}).then((response) => {
            setNumArticulos(response.data)
        })
    }
    useEffect(() => {
        NumElementsCarrito()
    }, [idU])

 
    return (
        <>
            <Routes>
                <Route path="Inicio" element={<Inicio data={data} dataFiltrado={dataFiltrado} setData={setData} NumElementsCarrito={NumElementsCarrito} setMenu={setMenu} />} />
                <Route path="Carrito" element={<Carrito NumElementsCarrito={NumElementsCarrito} setMenu={setMenu} />} />
                <Route path="Perfil" element={<EditarPerfil numArticulos={numArticulos} setMenu={setMenu} />} />
                <Route path="/*" element={<Navigate to={"Inicio"} />} />
            </Routes>
            {
                menu 
                ? (
                    <>
                        <Head setEstadoMenu={setEstadoMenu} numArticulos={numArticulos} />
                        <Menu estado={estadoMenu} setEstadoMenu={setEstadoMenu} setDataFiltrado={setDataFiltrado} />
                    </>
                )
                :(
                    <Head2 numArticulos={numArticulos} />
                )
            }
        </>
    )
}