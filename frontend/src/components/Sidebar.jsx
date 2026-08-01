import {
    Link,
    useLocation
} from "react-router-dom";

import {
    useState
} from "react";

import {
    FaHome,
    FaUsers,
    FaBuilding,
    FaCar,
    FaClipboardList,
    FaCreditCard,
    FaList,
    FaGasPump,
    FaMoneyCheckAlt,
    FaExchangeAlt,
    FaChevronDown,
    FaChevronRight,
    FaPlusCircle,
    FaEdit,
    FaIdCard,
    // FaMapMarkerAlt,
    FaTruck,
    FaKey,
    FaSignOutAlt 
} from "react-icons/fa";

import {
    useAuth
} from "../context/AuthContext";

import "../styles/Sidebar.css";

export default function Sidebar({ abierto }) {

    const [usuariosOpen,setUsuariosOpen] = useState(false);
    const [empresasOpen,setEmpresasOpen] = useState(false);
    const [sucursalesOpen,setSucursalesOpen] = useState(false);
    const [areasOpen,setAreasOpen] = useState(false);
    const [unidadesOpen,setUnidadesOpen] = useState(false);
    const [placasOpen,setPlacasOpen] = useState(false);
    const [asignacionesOpen,setAsignacionesOpen] = useState(false);
    const [creditosOpen,setCreditosOpen] = useState(false);
    const [transferenciasOpen,setTransferenciasOpen] = useState(false);
    const [prestamosOpen,setPrestamosOpen] = useState(false);
    const [solicitudesOpen,setSolicitudesOpen] = useState(false);

    const { usuario,logout } = useAuth();
    const rol = usuario?.rol;
    const location = useLocation();

    const linkActivo = (ruta) => {
        return location.pathname === ruta ? "active" : "";
    };

    return (
        <aside className={abierto ? "sidebar" : "sidebar cerrado"}>
            <div className="logo">
                <img 
                    src="/logo1.png"
                    alt="Control Vehicular"
                />
            </div>

            <div className="perfil">
                <div className="avatar">
                    <img 
                        src="/nino.png"
                        alt="Usuario"
                    />
                </div>
                <div className="datos">
                    <strong>
                        {usuario?.nombre}
                    </strong>
                    <br />
                    <small>
                        {rol}
                    </small>
                </div>
            </div>

            <nav>

                {/* ================================
                    SUPERUSUARIO
                   ================================ */}
                {rol === "Superusuario" && (
                <>
                    {/* Dashboard */}

                    <Link
                        to="/dashboard"
                        className={linkActivo("/dashboard")}
                    >
                        <FaHome />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/solicitudes/nueva" className={linkActivo("/solicitudes/nueva")}>
                        <FaClipboardList />
                        <span>Nueva solicitud</span>
                    </Link>
                    <Link to="/mis-solicitudes" className={linkActivo("/mis-solicitudes")}>
                        <FaList />
                        <span>Mis solicitudes</span>
                    </Link>                    

                    {/* Usuarios */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setUsuariosOpen(!usuariosOpen)}
                    >
                        <FaUsers />
                        <span>Gestión de Usuarios</span>

                        {usuariosOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {usuariosOpen && (
                        <div className="submenu">

                            <Link to="/usuarios/nuevo">
                                <FaPlusCircle />
                                <span>Nuevo usuario</span>
                            </Link>

                            <Link to="/usuarios">
                                <FaEdit />
                                <span>Administrar usuarios</span>
                            </Link>

                        </div>
                    )}

                    {/* Empresas */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setEmpresasOpen(!empresasOpen)}
                    >
                        <FaBuilding />
                        <span>Gestión de Empresas</span>

                        {empresasOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {empresasOpen && (
                        <div className="submenu">

                            <Link to="/empresas/nueva">
                                <FaPlusCircle />
                                <span>Nueva empresa</span>
                            </Link>

                            <Link to="/empresas">
                                <FaEdit />
                                <span>Administrar empresas</span>
                            </Link>

                        </div>
                    )}

                    {/* Sucursales */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setSucursalesOpen(!sucursalesOpen)}
                    >
                        <FaBuilding />
                        <span>Gestión de Sucursales</span>

                        {sucursalesOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {sucursalesOpen && (
                        <div className="submenu">

                            <Link to="/sucursales/nueva">
                                <FaPlusCircle />
                                <span>Nueva sucursal</span>
                            </Link>

                            <Link to="/sucursales">
                                <FaEdit />
                                <span>Administrar sucursales</span>
                            </Link>

                        </div>
                    )}

                    {/* Áreas */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setAreasOpen(!areasOpen)}
                    >
                        <FaList />
                        <span>Gestión de Áreas</span>

                        {areasOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {areasOpen && (
                        <div className="submenu">


                            <Link to="/areas">
                                <FaEdit />
                                <span>Administrar áreas</span>
                            </Link>

                        </div>
                    )}

                    {/* Unidades */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setUnidadesOpen(!unidadesOpen)}
                    >
                        <FaTruck />
                        <span>Gestión de Unidades</span>

                        {unidadesOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {unidadesOpen && (
                        <div className="submenu">

                            <Link to="/unidades/nueva">
                                <FaPlusCircle />
                                <span>Nueva unidad</span>
                            </Link>

                            <Link to="/unidades">
                                <FaEdit />
                                <span>Administrar unidades</span>
                            </Link>

                        </div>
                    )}

                    {/* Placas */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setPlacasOpen(!placasOpen)}
                    >
                        <FaIdCard />
                        <span>Gestión de Placas</span>

                        {placasOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {placasOpen && (
                        <div className="submenu">

                            <Link to="/placas/nueva">
                                <FaPlusCircle />
                                <span>Nueva placa</span>
                            </Link>

                            <Link to="/placas">
                                <FaEdit />
                                <span>Administrar placas</span>
                            </Link>

                        </div>
                    )}

                    {/* Asignaciones */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setAsignacionesOpen(!asignacionesOpen)}
                    >
                        <FaClipboardList />
                        <span>Gestión de Asignaciones</span>

                        {asignacionesOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {asignacionesOpen && (
                        <div className="submenu">

                            <Link to="/asignaciones/nueva">
                                <FaPlusCircle />
                                <span>Nueva asignación</span>
                            </Link>

                            <Link to="/asignaciones">
                                <FaEdit />
                                <span>Administrar asignaciones</span>
                            </Link>

                        </div>
                    )}

                    {/* Créditos */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setCreditosOpen(!creditosOpen)}
                    >
                        <FaCreditCard />
                        <span>Gestión de Créditos</span>

                        {creditosOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {creditosOpen && (
                        <div className="submenu">

                            <Link to="/creditos/nuevo">
                                <FaPlusCircle />
                                <span>Nuevo crédito</span>
                            </Link>

                            <Link to="/creditos">
                                <FaEdit />
                                <span>Administrar créditos</span>
                            </Link>

                        </div>
                    )}

                    {/* Transferencias */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setTransferenciasOpen(!transferenciasOpen)}
                    >
                        <FaExchangeAlt />
                        <span>Gestión de Transferencias</span>

                        {transferenciasOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {transferenciasOpen && (
                        <div className="submenu">

                            <Link to="/transferencias">
                                <FaEdit />
                                <span>Administrar transferencias</span>
                            </Link>

                        </div>
                    )}

                    {/* Préstamos */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setPrestamosOpen(!prestamosOpen)}
                    >
                        <FaKey />
                        <span>Gestión de Préstamos</span>

                        {prestamosOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {prestamosOpen && (
                        <div className="submenu">

                            <Link to="/prestamos/nuevo">
                                <FaPlusCircle />
                                <span>Nuevo préstamo</span>
                            </Link>

                            <Link to="/prestamos">
                                <FaEdit />
                                <span>Administrar préstamos</span>
                            </Link>

                        </div>
                    )}

                    {/* Solicitudes */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setSolicitudesOpen(!solicitudesOpen)}
                    >
                        <FaGasPump />
                        <span>Gestión de Solicitudes</span>

                        {solicitudesOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {solicitudesOpen && (
                        <div className="submenu">

                            <Link to="/solicitudes/nueva">
                                <FaPlusCircle />
                                <span>Nueva solicitud</span>
                            </Link>

                            <Link to="/solicitudes">
                                <FaEdit />
                                <span>Administrar solicitudes</span>
                            </Link>

                        </div>
                    )}
                    

                </>
                )}

                {/* ================================
                    ADMINISTRADOR
                   ================================ */}
                {rol === "Administrador" && (
                    <>

                    {/* Unidades */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setUnidadesOpen(!unidadesOpen)}
                    >
                        <FaTruck />
                        <span>Gestión de Unidades</span>

                        {unidadesOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {unidadesOpen && (
                        <div className="submenu">

                            <Link to="/unidades/nueva">
                                <FaPlusCircle />
                                <span>Nueva unidad</span>
                            </Link>

                            <Link to="/unidades">
                                <FaEdit />
                                <span>Administrar unidades</span>
                            </Link>

                        </div>
                    )}

                    {/* Placas */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setPlacasOpen(!placasOpen)}
                    >
                        <FaIdCard />
                        <span>Gestión de Placas</span>

                        {placasOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {placasOpen && (
                        <div className="submenu">

                            <Link to="/placas/nueva">
                                <FaPlusCircle />
                                <span>Nueva placa</span>
                            </Link>

                            <Link to="/placas">
                                <FaEdit />
                                <span>Administrar placas</span>
                            </Link>

                        </div>
                    )}

                    {/* Asignaciones */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setAsignacionesOpen(!asignacionesOpen)}
                    >
                        <FaClipboardList />
                        <span>Gestión de Asignaciones</span>

                        {asignacionesOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {asignacionesOpen && (
                        <div className="submenu">

                            <Link to="/asignaciones/nueva">
                                <FaPlusCircle />
                                <span>Nueva asignación</span>
                            </Link>

                            <Link to="/asignaciones">
                                <FaEdit />
                                <span>Administrar asignaciones</span>
                            </Link>

                        </div>
                    )}
                    {/* Préstamos */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setPrestamosOpen(!prestamosOpen)}
                    >
                        <FaKey />
                        <span>Gestión de Préstamos</span>

                        {prestamosOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {prestamosOpen && (
                        <div className="submenu">

                            <Link to="/prestamos/nuevo">
                                <FaPlusCircle />
                                <span>Nuevo préstamo</span>
                            </Link>

                            <Link to="/prestamos">
                                <FaEdit />
                                <span>Administrar préstamos</span>
                            </Link>

                        </div>
                    )}

                    </>
                )}

                {/* ================================
                    CONTABILIDAD
                   ================================ */}
                {rol === "Contabilidad" && (
                    <>

                    {/* Solicitudes */}

                    <div
                        className="submenu-toggle"
                        onClick={() => setSolicitudesOpen(!solicitudesOpen)}
                    >
                        <FaGasPump />
                        <span>Gestión de Solicitudes</span>

                        {solicitudesOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>

                    {solicitudesOpen && (
                        <div className="submenu">

                            <Link to="/solicitudes/nueva">
                                <FaPlusCircle />
                                <span>Nueva solicitud</span>
                            </Link>

                            <Link to="/solicitudes">
                                <FaEdit />
                                <span>Administrar solicitudes</span>
                            </Link>

                        </div>
                    )}

                        <Link to="/creditos" className={linkActivo("/creditos")}>
                            <FaCreditCard />
                            <span>Créditos</span>
                        </Link>
                        <Link to="/transferencias" className={linkActivo("/transferencias")}>
                            <FaMoneyCheckAlt />
                            <span>Transferencias</span>
                        </Link>
                        <Link to="/tickets" className={linkActivo("/tickets")}>
                            <FaGasPump />
                            <span>Tickets</span>
                        </Link>

                        <Link to="/solicitudes/nueva" className={linkActivo("/solicitudes/nueva")}>
                            <FaClipboardList />
                            <span>Nueva solicitud</span>
                        </Link>
                        <Link to="/mis-solicitudes" className={linkActivo("/mis-solicitudes")}>
                            <FaList />
                            <span>Mis solicitudes</span>
                        </Link>


                    </>
                )}

                {/* ================================
                    CONDUCTOR
                   ================================ */}
                {rol === "Conductor" && (
                    <>
                        <Link to="/solicitudes/nueva" className={linkActivo("/solicitudes/nueva")}>
                            <FaClipboardList />
                            <span>Nueva solicitud</span>
                        </Link>
                        <Link to="/mis-solicitudes" className={linkActivo("/mis-solicitudes")}>
                            <FaList />
                            <span>Mis solicitudes</span>
                        </Link>
                    </>
                )}
            </nav>

            <div
                className="logout"
                onClick={logout}
            >
                <FaSignOutAlt />
                <span>Cerrar sesión</span>
            </div>            
        </aside>
    );
}