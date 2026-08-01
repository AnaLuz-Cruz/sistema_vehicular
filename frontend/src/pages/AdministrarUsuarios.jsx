import { useEffect, useState } from "react";
import {
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    cambiarEstadoUsuario
} from "../services/usuariosService";
import { obtenerEmpresas } from "../services/empresasService";
import { obtenerSucursales } from "../services/sucursalesService";
import { obtenerAreas } from "../services/areasService";
import TablaUsuarios from "../components/usuarios/TablaUsuarios";
import FormularioUsuario from "../components/usuarios/FormularioUsuario";

export default function AdministrarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [areas, setAreas] = useState([]);
    const [usuarioEditar, setUsuarioEditar] = useState(null);

    const cargarDatos = async () => {
        try {
            const [
                usuariosData,
                empresasData,
                sucursalesData,
                areasData
            ] = await Promise.all([
                obtenerUsuarios(),
                obtenerEmpresas(),
                obtenerSucursales(),
                obtenerAreas()
            ]);

            setUsuarios(usuariosData);
            setEmpresas(empresasData);
            setSucursales(sucursalesData);
            setAreas(areasData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const cambiarEstado = async (id, estado) => {
        const confirmar = window.confirm(
            `¿Está seguro de ${estado === 1 ? "activar" : "desactivar"} este usuario?`
        );
        if (!confirmar) return;

        try {
            await cambiarEstadoUsuario(id, estado);
            alert("Estado actualizado correctamente.");
            await cargarDatos();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Ocurrió un error al actualizar el estado."
            );
        }
    };

    const editarUsuario = async (id) => {
        try {
            const usuario = await obtenerUsuario(id);
            setUsuarioEditar(usuario);
        } catch (error) {
            console.error(error);
        }
    };

    const actualizarDatosUsuario = async (usuario) => {
        try {
            await actualizarUsuario(
                usuarioEditar.id_usuario,
                usuario
            );
            alert("Usuario actualizado correctamente.");
            await cargarDatos();
            setUsuarioEditar(null);
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "No fue posible actualizar el usuario."
            );
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Administrar Usuarios</h1>
            </div>

            <hr className="admin-divider" />

            <TablaUsuarios
                usuarios={usuarios}
                onEditar={editarUsuario}
                onEstado={cambiarEstado}
            />

            {/* Modal para editar usuario */}
            {usuarioEditar && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content">
                        <FormularioUsuario
                            usuario={usuarioEditar}
                            empresas={empresas}
                            sucursales={sucursales}
                            areas={areas}
                            onGuardar={actualizarDatosUsuario}
                            onCancelar={() => {
                                setUsuarioEditar(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}