import "../../styles/Tabla.css";

export default function TablaUsuarios({
    usuarios,
    onEditar,
    onEstado
}) {
    return (
        <div className="tabla-container">
            <table className="tabla-usuarios">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Empresa</th>
                        <th>Sucursal</th>
                        <th>Área</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => {
                        const esActivo = Number(usuario.estado) === 1;

                        return (
                            <tr key={usuario.id_usuario}>
                                <td>{usuario.id_usuario}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.usuario}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.rol}</td>
                                <td>{usuario.empresa}</td>
                                <td>{usuario.sucursal}</td>
                                <td>{usuario.area}</td>
                                <td>
                                    <span className={`badge ${esActivo ? "badge-activo" : "badge-inactivo"}`}>
                                        {esActivo ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td>
                                    <div className="acciones-cell">
                                        <button
                                            className="btn-accion btn-editar"
                                            onClick={() => onEditar(usuario.id_usuario)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className={`btn-accion ${esActivo ? "btn-estado-desactivar" : "btn-estado-activar"}`}
                                            onClick={() =>
                                                onEstado(
                                                    usuario.id_usuario,
                                                    esActivo ? 0 : 1
                                                )
                                            }
                                        >
                                            {esActivo ? "Desactivar" : "Activar"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}