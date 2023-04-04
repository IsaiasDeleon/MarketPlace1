import { useState, useEffect } from "react";
import axios from 'axios';

import { Route, Routes } from "react-router-dom";
import { Login } from "../ui/pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { AppM } from "./AppM";
import { PublicRoute } from "./PublicRoute";

export const AppRoute = () => { 
    return (
        <>
            <Routes>
                <Route path="/*" element={
                    <PrivateRoute>
                        <AppM/>
                    </PrivateRoute>
                }/>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                }/>
            </Routes>
            
        </>
    )
}