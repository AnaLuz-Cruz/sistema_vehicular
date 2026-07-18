
import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaUserPlus, FaEdit, FaLock, FaUnlock } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Usuarios.css";


import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AdministrarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [rolFiltro, setRolFiltro] = useState("Todos");
    const [estadoFiltro, setEstadoFiltro] = useState("Todos");
    const [cargando, setCargando] = useState(true);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const [formulario, setFormulario] = useState({
        nombre: "",
        usuario: "",
        correo: "",
        password: "",
        rol: "",
        id_empresa: "",
        id_sucursal: "",
        id_area: ""
    });

    const [empresas, setEmpresas] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [areas, setAreas] = useState([]);

    const sucursalesFiltradas = sucursales.filter(
        (s) => String(s.id_empresa) === String(formulario.id_empresa)
    );

    const cargarUsuarios = async () => {
        try {
            setCargando(true);
            const respuesta = await api.get("/usuarios");
            setUsuarios(respuesta.data.data);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
        } finally {
            setCargando(false);
        }
    };

    const cargarCatalogos = async () => {
        try {
            const [empresasRes, sucursalesRes, areasRes] = await Promise.all([
                api.get("/empresas"),
                api.get("/sucursales"),
                api.get("/areas")
            ]);
            setEmpresas(empresasRes.data.data);
            setSucursales(sucursalesRes.data.data);
            setAreas(areasRes.data.data);
        } catch (error) {
            console.error("Error al cargar catálogos", error);
        }
    };

    const limpiarFormulario = () => {
        setFormulario({
            nombre: "",
            usuario: "",
            correo: "",
            password: "",
            rol: "",
            id_empresa: "",
            id_sucursal: "",
            id_area: ""
        });
    };

    useEffect(() => {
        cargarUsuarios();
        cargarCatalogos();
    }, []);

    const nuevoUsuario = () => {
        setModoEdicion(false);
        limpiarFormulario();
        setMostrarModal(true);
    };


    const usuariosFiltrados = usuarios.filter((usuario) => {
        const texto = busqueda.toLowerCase();
        const coincideBusqueda =
            usuario.nombre.toLowerCase().includes(texto) ||
            usuario.usuario.toLowerCase().includes(texto) ||
            usuario.correo.toLowerCase().includes(texto);

        const coincideRol = rolFiltro === "Todos" || usuario.rol === rolFiltro;
        const coincideEstado = estadoFiltro === "Todos" || String(usuario.estado) === estadoFiltro;

        return coincideBusqueda && coincideRol && coincideEstado;
    });

    const total = usuarios.length;
    const activos = usuarios.filter((u) => Number(u.estado) === 1).length;
    const inactivos = usuarios.filter((u) => Number(u.estado) === 0).length;
    const conductores = usuarios.filter((u) => u.rol === "Conductor").length;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const guardarUsuario = async () => {
        if (!formulario.nombre || !formulario.usuario || !formulario.correo || !formulario.rol) {
            Swal.fire("Campos incompletos", "Complete los campos obligatorios", "warning");
            return;
        }

        try {
            if (modoEdicion) {
                await api.put(`/usuarios/${usuarioSeleccionado}`, formulario);
            } else {
                await api.post("/usuarios", formulario);
            }
            Swal.fire("Correcto", "Usuario guardado correctamente", "success");
            setMostrarModal(false);
            cargarUsuarios();
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "No se pudo guardar", "error");
        }
    };

    const editarUsuario = async (usuario) => {
        try {
            const respuesta = await api.get(`/usuarios/${usuario.id_usuario}`);
            setFormulario({ ...respuesta.data.data, password: "" });
            setUsuarioSeleccionado(usuario.id_usuario);
            setModoEdicion(true);
            setMostrarModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const cambiarEstado = async (usuario) => {
        const nuevoEstado = Number(usuario.estado) === 1 ? 0 : 1;
        try {
            await api.patch(`/usuarios/${usuario.id_usuario}/estado`, { estado: nuevoEstado });
            Swal.fire("Actualizado", "Estado cambiado correctamente", "success");
            cargarUsuarios();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Administración de Usuarios</h2>
                <button className="btn btn-primary" onClick={nuevoUsuario}>
                    <FaUserPlus /> Nuevo Usuario
                </button>
            </div>

            {/* TARJETAS */}
            <div className="row mb-4">
                <div className="col-md-3"><div className="card p-3"><h5>Total</h5><h2>{total}</h2></div></div>
                <div className="col-md-3"><div className="card p-3"><h5>Activos</h5><h2>{activos}</h2></div></div>
                <div className="col-md-3"><div className="card p-3"><h5>Inactivos</h5><h2>{inactivos}</h2></div></div>
                <div className="col-md-3"><div className="card p-3"><h5>Conductores</h5><h2>{conductores}</h2></div></div>
            </div>

            {/* FILTROS */}
            <div className="card p-3 mb-3">
                <div className="row">
                    <div className="col-md-6"><input className="form-control" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} /></div>
                    <div className="col-md-3">
                        <select className="form-select" value={rolFiltro} onChange={(e) => setRolFiltro(e.target.value)}>
                            <option>Todos</option><option>Administrador</option><option>Superusuario</option><option>Contabilidad</option><option>Conductor</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
                            <option value="Todos">Todos</option><option value="1">Activos</option><option value="0">Inactivos</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* TABLA */}
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr><th>Nombre</th><th>Usuario</th><th>Correo</th><th>Rol</th><th>Empresa</th><th>Sucursal</th><th>Área</th><th>Estado</th><th>Acciones</th></tr>
                        </thead>
                        <tbody>
                            {cargando ? (
                                <tr><td colSpan="9" className="text-center">Cargando...</td></tr>
                            ) : (
                                usuariosFiltrados.map(usuario => (
                                    <tr key={usuario.id_usuario}>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.usuario}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.rol}</td>
                                        <td>{usuario.empresa}</td>
                                        <td>{usuario.sucursal}</td>
                                        <td>{usuario.area}</td>
                                        <td>
                                            <span className={`badge ${Number(usuario.estado) === 1 ? "bg-success" : "bg-danger"}`}>
                                                {Number(usuario.estado) === 1 ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => editarUsuario(usuario)}><FaEdit /></button>
                                            <button className="btn btn-secondary btn-sm" onClick={() => cambiarEstado(usuario)}>
                                                {usuario.estado === 1 ? <FaLock /> : <FaUnlock />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}

<div className="container">
            <button className="btn btn-primary" onClick={nuevoUsuario}><FaUserPlus /> Nuevo Usuario</button>
            
            {/* Modal */}
            {mostrarModal && (
                <div className="modal-overlay">
                    <div className="modal-usuario card p-4">
                        <h3>{modoEdicion ? "Editar Usuario" : "Nuevo Usuario"}</h3>
                        
                        <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={handleChange} />
                        <input className="form-control mb-2" name="usuario" placeholder="Usuario" disabled={modoEdicion} value={formulario.usuario} onChange={handleChange} />
                        <input className="form-control mb-2" name="correo" placeholder="Correo" value={formulario.correo} onChange={handleChange} />
                        
                        {!modoEdicion && <input className="form-control mb-2" type="password" name="password" placeholder="Contraseña" value={formulario.password} onChange={handleChange} />}

                        <select className="form-select mb-2" name="rol" value={formulario.rol} onChange={handleChange}>
                            <option value="">Seleccione rol</option>
                            <option>Administrador</option><option>Superusuario</option><option>Contabilidad</option><option>Conductor</option>
                        </select>

                        {/* SELECT EMPRESAS */}
                        <select className="form-select mb-2" name="id_empresa" value={formulario.id_empresa} onChange={handleChange}>
                            <option value="">Seleccione Empresa</option>
                            {empresas.map(e => <option key={e.id_empresa} value={e.id_empresa}>{e.razon_social}</option>)}
                        </select>

                        {/* SELECT SUCURSALES (Dependiente de Empresa) */}
                        <select className="form-select mb-2" name="id_sucursal" value={formulario.id_sucursal} onChange={handleChange} disabled={!formulario.id_empresa}>
                            <option value="">Seleccione Sucursal</option>
                            {sucursalesFiltradas.map(s => <option key={s.id_sucursal} value={s.id_sucursal}>{s.nombre}</option>)}
                        </select>

                        {/* SELECT AREAS */}
                        <select className="form-select mb-3" name="id_area" value={formulario.id_area} onChange={handleChange}>
                            <option value="">Seleccione Área</option>
                            {areas.map(a => <option key={a.id_area} value={a.id_area}>{a.nombre}</option>)}
                        </select>

                        <button className="btn btn-success me-2" onClick={guardarUsuario}>Guardar</button>
                        <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>

        </div>
    );
}