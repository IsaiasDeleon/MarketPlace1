import { useState } from "react";
import { Navigate, Route, Routes} from "react-router-dom";
import { Head } from "../ui/components/Head";
import { Menu } from "../ui/components/Menu";
import { Inicio } from "../ui/pages";



export const RoutesApp = () =>{
    //Global estado de menu
    const [estadoMenu, setEstadoMenu] = useState(false);

    //Get data 
    const [data, setData] = useState([])

    return (
        <>
            <Routes>
                <Route  path="Inicio" element={<Inicio data={data} setData={setData}/>} />
                <Route path="/*" element={<Navigate to={"Inicio"}/> } />
            </Routes>
            
            <Head setEstadoMenu={setEstadoMenu} />
            <Menu estado={estadoMenu} setEstadoMenu={setEstadoMenu}  setData={setData}  />

        </>
    )
}