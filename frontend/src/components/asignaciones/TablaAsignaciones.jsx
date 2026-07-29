export default function TablaAsignaciones({ 
    asignaciones, 
    onVer, 
    onEditar, 
    onEstado }) {
        
    return (
        <table border="1" width="100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Unidad</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Empresa</th>
                    <th>Sucursal</th>
                    <th>Fecha Asignación</th>
                    <th>Fecha Fin</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {asignaciones.length > 0 ? (
                    asignaciones.map((asignacion) => {
                        const esActivo = asignacion.status === "activo";
                        return (
                            <tr key={asignacion.id_asignacion}>
                                <td>{asignacion.id_asignacion}</td>
                                <td>{asignacion.usuario || "Sin responsable"}</td>
                                <td>{asignacion.rol || "-"}</td>
                                <td>{asignacion.cve}</td>
                                <td>{asignacion.marca}</td>
                                <td>{asignacion.modelo}</td>
                                <td>{asignacion.empresa || "-"}</td>
                                <td>{asignacion.sucursal}</td>
                                <td>{asignacion.fecha_asignacion}</td>
                                <td>{asignacion.fecha_fin || "-"}</td>
                                <td>{esActivo ? "Activa" : "Inactiva"}</td>
                                <td>
                                    <button onClick={() => onVer(asignacion.id_asignacion)}>
                                        Ver más
                                    </button>
                                    <button onClick={() => onEditar(asignacion.id_asignacion)}>
                                        Editar
                                    </button>
                                    <button onClick={() => onEstado(asignacion.id_asignacion, esActivo ? "inactivo" : "activo")}>
                                        {esActivo ? "Desactivar" : "Activar"}
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="12" align="center">
                            No hay asignaciones registradas.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}