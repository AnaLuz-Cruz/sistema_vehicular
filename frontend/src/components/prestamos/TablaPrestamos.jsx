import "../../styles/Tabla.css";

export default function TablaPrestamos({

    prestamos,

    onEditar,

    onEstado

}) {


    if (prestamos.length === 0) {

        return (

            <p>

                No hay préstamos registrados.

            </p>

        );

    }


    return (

        <div className="tabla-container">

            <table className="tabla-usuarios">

                <thead>

                    <tr>

                        <th>Usuario</th>
                        <th>Unidad</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Fecha inicio</th>
                        <th>Fecha fin</th>
                        <th>Estado</th>
                        <th>Acciones</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        prestamos.map((prestamo) => {

                            let badgeClass = "badge badge-inactivo";

                            switch (prestamo.estado) {

                                case "aprobado":
                                case "entregado":
                                case "devuelto":
                                    badgeClass = "badge badge-activo";
                                    break;

                                case "cancelado":
                                default:
                                    badgeClass = "badge badge-inactivo";
                                    break;

                            }

                            return (

                                <tr key={prestamo.id_historial}>

                                    <td>

                                        {prestamo.usuario}

                                    </td>

                                    <td>

                                        {prestamo.cve}

                                    </td>

                                    <td>

                                        {prestamo.marca}

                                    </td>

                                    <td>

                                        {prestamo.modelo}

                                    </td>

                                    <td>

                                        {

                                            prestamo.fecha_inicio

                                                ?

                                                prestamo.fecha_inicio.substring(0, 10)

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            prestamo.fecha_fin

                                                ?

                                                prestamo.fecha_fin.substring(0, 10)

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td>

                                        <span className={badgeClass}>

                                            {prestamo.estado}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="acciones-cell">

                                            <button

                                                className="btn-accion btn-editar"

                                                onClick={() =>
                                                    onEditar(
                                                        prestamo.id_historial
                                                    )
                                                }

                                            >

                                                Editar

                                            </button>


                                            {

                                                prestamo.estado !== "aprobado" && (

                                                    <button

                                                        className="btn-accion btn-estado-activar"

                                                        onClick={() =>
                                                            onEstado(
                                                                prestamo.id_historial,
                                                                "aprobado"
                                                            )
                                                        }

                                                    >

                                                        Aprobar

                                                    </button>

                                                )

                                            }


                                            {

                                                prestamo.estado !== "entregado" && (

                                                    <button

                                                        className="btn-accion btn-estado-activar"

                                                        onClick={() =>
                                                            onEstado(
                                                                prestamo.id_historial,
                                                                "entregado"
                                                            )
                                                        }

                                                    >

                                                        Entregar

                                                    </button>

                                                )

                                            }


                                            {

                                                prestamo.estado !== "devuelto" && (

                                                    <button

                                                        className="btn-accion btn-estado-activar"

                                                        onClick={() =>
                                                            onEstado(
                                                                prestamo.id_historial,
                                                                "devuelto"
                                                            )
                                                        }

                                                    >

                                                        Devolver

                                                    </button>

                                                )

                                            }


                                            {

                                                prestamo.estado !== "cancelado" && (

                                                    <button

                                                        className="btn-accion btn-estado-desactivar"

                                                        onClick={() =>
                                                            onEstado(
                                                                prestamo.id_historial,
                                                                "cancelado"
                                                            )
                                                        }

                                                    >

                                                        Cancelar

                                                    </button>

                                                )

                                            }

                                        </div>

                                    </td>

                                </tr>

                            );

                        })

                    }

                </tbody>

            </table>

        </div>

    );

}