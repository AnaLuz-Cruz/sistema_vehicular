import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CambiarPassword from "../pages/CambiarPassword";
import RecuperarPassword from "../pages/RecuperarPassword";
// Usuarios
import NuevoUsuario from "../pages/NuevoUsuario";
import AdministrarUsuarios from "../pages/AdministrarUsuarios";
// Empresas
import NuevaEmpresa from "../pages/NuevaEmpresa";
import AdministrarEmpresas from "../pages/AdministrarEmpresas";
// Sucursales
import NuevaSucursal from "../pages/NuevaSucursal";
import AdministrarSucursales from "../pages/AdministrarSucursales";
// Áreas
import AdministrarAreas from "../pages/AdministrarAreas";
// Unidades
import NuevaUnidad from "../pages/NuevaUnidad";
import AdministrarUnidades from "../pages/AdministrarUnidades";
// Placas
import NuevaPlaca from "../pages/NuevaPlaca";
import AdministrarPlacas from "../pages/AdministrarPlacas";
// Asignaciones
import NuevaAsignacion from "../pages/NuevaAsignacion";
import AdministrarAsignaciones from "../pages/AdministrarAsignaciones";
// Créditos
import NuevoCredito from "../pages/NuevoCredito";
import AdministrarCreditos from "../pages/AdministrarCreditos";
// Transferencias
import AdministrarTransferencias from "../pages/AdministrarTransferencias";
// Préstamos
import NuevoPrestamo from "../pages/NuevoPrestamo";
import AdministrarPrestamos from "../pages/AdministrarPrestamos";
// Solicitudes
import NuevaSolicitud from "../pages/NuevaSolicitud";
import AdministrarSolicitudes from "../pages/AdministrarSolicitudes";

export default function AppRouter() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/usuarios/nuevo" element={<NuevoUsuario />} />
                <Route path="/usuarios" element={<AdministrarUsuarios />} />
                <Route path="/empresas/nueva" element={<NuevaEmpresa />} />
                <Route path="/empresas" element={<AdministrarEmpresas />} />
                <Route path="/sucursales/nueva" element={<NuevaSucursal />} />
                <Route path="/sucursales" element={<AdministrarSucursales />} />
                <Route path="/areas" element={<AdministrarAreas />} />
                <Route path="/unidades/nueva" element={<NuevaUnidad />} />
                <Route path="/unidades" element={<AdministrarUnidades />} />
                <Route path="/placas/nueva" element={<NuevaPlaca />} />
                <Route path="/placas" element={<AdministrarPlacas />} />
                <Route path="/asignaciones/nueva" element={<NuevaAsignacion />} />
                <Route path="/asignaciones" element={<AdministrarAsignaciones />} />
                <Route path="/creditos/nuevo" element={<NuevoCredito />} />
                <Route path="/creditos" element={<AdministrarCreditos />} />
                <Route path="/transferencias" element={<AdministrarTransferencias />} />
                <Route path="/prestamos/nuevo" element={<NuevoPrestamo />} />
                <Route path="/prestamos" element={<AdministrarPrestamos />} />
                <Route path="/solicitudes/nueva" element={<NuevaSolicitud />} />
                <Route path="/solicitudes" element={<AdministrarSolicitudes />} />

            </Route>

            <Route path="/cambiar-password" element={<CambiarPassword />} />
            <Route path="/recuperar" element={<RecuperarPassword />} />

        </Routes>

    );

}