import { Route, Routes } from "react-router-dom";
import { Login } from "../ui/pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { AppM } from "./AppM";
import { PublicRoute } from "./PublicRoute";
import { IncioD } from "./InicioDatos";

export const AppRoute = () => { 
    return (
        <>
            <Routes>
                <Route path="/*" element={
                    <PrivateRoute>
                        <AppM/>
                    </PrivateRoute>
                }/>
                <Route path="/Inicio" element={
                    // <PublicRoute>
                        <IncioD/>
                    // </PublicRoute>
                }/>
                 <Route path="/Login" element={<Login/>} />
            </Routes>
            
        </>
    )
}