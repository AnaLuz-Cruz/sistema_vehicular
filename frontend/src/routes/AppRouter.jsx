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
import AdministrarEmpresas from "../pages/AdministrarEmpresas";
import AdministrarSucursales from "../pages/AdministrarSucursales";
import AdministrarAreas from "../pages/AdministrarAreas";
import AdministrarUnidades from "../pages/AdministrarUnidades";
import AdministrarAsignaciones from "../pages/AdministrarAsignaciones";
import AdministrarPlacas from "../pages/AdministrarPlacas";
import AdministrarCreditos from "../pages/AdministrarCreditos";
import AdministrarTransferencias from "../pages/AdministrarTransferencias";
import AdministrarPrestamos from "../pages/AdministrarPrestamos";
import AdministrarSolicitudes from "../pages/AdministrarSolicitudes";


export default function AppRouter() {

    return (
            <Routes>

                <Route path="/" element={<Login />}/>
                <Route path="/cambiar-password" element={<CambiarPassword/>}/>                
                <Route path="/recuperar" element={<RecuperarPassword/>}/>

                <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    
                    {/* RUTAS SIN SIDEBAR */}
                    <Route path="/usuarios" element={<AdministrarUsuarios/>}/>
                    <Route path="/empresas" element={<AdministrarEmpresas />}/>
                    <Route path="/sucursales" element={<AdministrarSucursales/>}/>
                    <Route path="/areas" element={<AdministrarAreas/>}/>
                    <Route path="/unidades" element={<AdministrarUnidades/>}/>
                    <Route path="/asignaciones" element={<AdministrarAsignaciones/>}/>
                    <Route path="/placas" element={<AdministrarPlacas />}/>
                    <Route path="/creditos" element={<AdministrarCreditos />}/>
                    <Route path="/transferencias" element={<AdministrarTransferencias />}/>
                    <Route path="/prestamos" element={<AdministrarPrestamos />}/>
                    <Route path="/solicitudes" element={<AdministrarSolicitudes />}/>
                </Route>

            </Routes>

    );

}
