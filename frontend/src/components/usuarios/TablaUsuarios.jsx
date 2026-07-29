export default function TablaUsuarios({
    usuarios,
    onEditar,
    onEstado
}) {

    return (

        <table border="1">

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

                {

                    usuarios.map((usuario) => (

                        <tr key={usuario.id_usuario}>

                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.rol}</td>
                            <td>{usuario.empresa}</td>
                            <td>{usuario.sucursal}</td>
                            <td>{usuario.area}</td>
                            <td>{Number(usuario.estado) === 1 ? "Activo" : "Inactivo"}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        onEditar(usuario.id_usuario)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() =>
                                        onEstado(
                                            usuario.id_usuario,
                                            usuario.estado === 1 ? 0 : 1
                                        )
                                    }
                                >
                                    {usuario.estado === 1
                                        ? "Desactivar"
                                        : "Activar"}
                                </button>

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}