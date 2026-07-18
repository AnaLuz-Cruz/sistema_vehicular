import {
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "../components/ProtectedRoute";

import CambiarPassword from "../pages/CambiarPassword";
import RecuperarPassword from "../pages/RecuperarPassword";
import AdministrarUsuarios from "../pages/AdministrarUsuarios";


export default function AppRouter() {

    return (
            <Routes>

                <Route path="/" element={<Login />}/>
                <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}><Route path="/dashboard" element={<Dashboard />}/></Route>



                 {/* RUTAS SIN SIDEBAR */}
                <Route path="/cambiar-password" element={<CambiarPassword/>}/>                
                <Route path="/recuperar" element={<RecuperarPassword/>}/>
                <Route path="/usuarios" element={<AdministrarUsuarios/>}/>

            </Routes>

    );

}