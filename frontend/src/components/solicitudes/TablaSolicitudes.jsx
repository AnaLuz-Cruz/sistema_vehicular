import "../../styles/Tabla.css";

export default function TablaSolicitudes({

    solicitudes,

    onDetalle,

    onEstado

}) {


    if (solicitudes.length === 0) {

        return (

            <p>

                No hay solicitudes registradas.

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
                        <th>Combustible</th>
                        <th>Litros</th>
                        <th>KM</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        solicitudes.map((solicitud) => {

                            let badgeClass = "badge badge-inactivo";

                            switch (solicitud.estado) {

                                case "Aprobada":
                                case "Finalizado":
                                    badgeClass = "badge badge-activo";
                                    break;

                                case "Pendiente":
                                case "Rechazada":
                                default:
                                    badgeClass = "badge badge-inactivo";
                                    break;

                            }

                            return (

                                <tr key={solicitud.id_solicitud}>

                                    <td>

                                        {solicitud.usuario}

                                    </td>

                                    <td>

                                        {solicitud.cve}

                                    </td>

                                    <td>

                                        {solicitud.combustible}

                                    </td>

                                    <td>

                                        {solicitud.litros_solicitados} L

                                    </td>

                                    <td>

                                        {solicitud.km_actual}

                                    </td>

                                    <td>

                                        {

                                            solicitud.fecha_solicitud

                                                ?

                                                solicitud.fecha_solicitud.substring(0, 10)

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td>

                                        <span className={badgeClass}>

                                            {solicitud.estado}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="acciones-cell">

                                            <button

                                                className="btn-accion btn-editar"

                                                onClick={() =>
                                                    onDetalle(
                                                        solicitud.id_solicitud
                                                    )
                                                }

                                            >

                                                Ver detalle

                                            </button>


                                            {

                                                solicitud.estado === "Pendiente" && (

                                                    <>

                                                        <button

                                                            className="btn-accion btn-estado-activar"

                                                            onClick={() =>
                                                                onEstado(
                                                                    solicitud.id_solicitud,
                                                                    "Aprobada"
                                                                )
                                                            }

                                                        >

                                                            Aprobar

                                                        </button>

                                                        <button

                                                            className="btn-accion btn-estado-desactivar"

                                                            onClick={() =>
                                                                onEstado(
                                                                    solicitud.id_solicitud,
                                                                    "Rechazada"
                                                                )
                                                            }

                                                        >

                                                            Rechazar

                                                        </button>

                                                    </>

                                                )

                                            }


                                            {

                                                solicitud.estado === "Aprobada" && (

                                                    <button

                                                        className="btn-accion btn-estado-activar"

                                                        onClick={() =>
                                                            onEstado(
                                                                solicitud.id_solicitud,
                                                                "Finalizado"
                                                            )
                                                        }

                                                    >

                                                        Finalizar

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