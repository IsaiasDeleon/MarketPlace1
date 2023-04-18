import { useContext, useEffect, useState } from "react";
import { Head } from "../ui/components/Head";
import { Menu } from "../ui/components/Menu";
import { Inicio } from "../ui/pages";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import { Noti } from "../ui/components/Notificaciones";
const URLServer = "http://192.168.100.13:3020/"
export const IncioD = () => {
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
        //Get numero de articulos en gustos
        const [numGustos, setNumGustos] = useState(0);
        //Elementos de la tabla gustos
        const [elemntsGustos, setElementsGustos] = useState([]);
        const [notiCarrito, setNotiCarrito] = useState();
        const [activeNoti, setActiveNoti] = useState();

        //Identificador para ver si quitamos el menu y cambiamos de head
        const [menu, setMenu] = useState(false);
        
       
        function NumElementsGustos(){
            axios.post(URLServer + "GetNumGustos",{"id":idU}).then((response) => {
                setNumGustos(response.data)
            })
        }
        function NumElementsCarrito() {
            //Peticion para obtener el numero de productosque tiene en el carrito
            axios.post(URLServer + "GetNumCarrito",{"id":idU}).then((response) => {
                setNumArticulos(response.data)
            })
        }
        function ElementsGustos(){
            axios.post(URLServer + "GetElementsGustos", {"id":idU}).then((response) => {
                setElementsGustos(response.data);
            })
        }
        function DeleteItemGustos(id) {
            axios.post(URLServer + "deleteItemGustos", {"idU":idU, "id": id }).then((response) => {
                //Si la operacion se hizo correctamente nos regresara Eliminado
                if (response.data == "EliminadoGusto") {
                    //Mandamos a llamar a la funcion de getItemCarrito para obtener la actualizacion de los elementos 
                    ElementsGustos()
                    //Llamamos a la funcion NumELementsCarrito para obtener ka actualizacion de los elementos en el carrito
                    NumElementsGustos()
                    //Enviamos el mensaje a las notificaciones para mostrar la alerta al usuario
                    setNotiCarrito(response.data)
                    setActiveNoti(true)
                    setTimeout(() => {
                        setActiveNoti(false)
                    }, 4000);
                }
            });
        }
        useEffect(() => {
            if(idU){
                NumElementsCarrito()
                NumElementsGustos();
                ElementsGustos();
            }
           
        }, [idU])
    return (
        <>
            <Inicio data={data} dataFiltrado={dataFiltrado} setData={setData} NumElementsCarrito={NumElementsCarrito} setMenu={setMenu} NumElementsGustos={NumElementsGustos} ElementsGustos={ElementsGustos} />
            <Head setEstadoMenu={setEstadoMenu} numArticulos={numArticulos} numGustos={numGustos} elemntsGustos={elemntsGustos} DeleteItemGustos={DeleteItemGustos} />
            <Menu estado={estadoMenu} setEstadoMenu={setEstadoMenu} setDataFiltrado={setDataFiltrado} />  
            <Noti notiCarrito={notiCarrito} activeNoti={activeNoti} />
        </>
    )
}