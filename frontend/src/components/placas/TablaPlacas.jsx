import "../../styles/Tabla.css";

export default function TablaPlacas({

    placas,

    onEditar,

    onEstado

}) {

    if (placas.length === 0) {

        return (

            <p>

                No hay placas registradas.

            </p>

        );

    }

    return (

        <div className="tabla-container">

            <table className="tabla-usuarios">

                <thead>

                    <tr>

                        <th>Folio</th>
                        <th>Placa</th>
                        <th>Unidad</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Expedición</th>
                        <th>Vigencia</th>
                        <th>Monto</th>
                        <th>Renovación</th>
                        <th>Estado</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        placas.map((placa) => {

                            const estadoClase =
                                placa.status === "activa"
                                    ? "badge badge-activo"
                                    : "badge badge-inactivo";

                            const estadoTexto =
                                placa.status === "activa"
                                    ? "Activa"
                                    : placa.status === "vencida"
                                    ? "Vencida"
                                    : "Cancelada";

                            return (

                                <tr key={placa.id_placa}>

                                    <td>
                                        {placa.folio || "-"}
                                    </td>

                                    <td>
                                        {placa.placa}
                                    </td>

                                    <td>
                                        {placa.cve || "-"}
                                    </td>

                                    <td>
                                        {placa.marca || "-"}
                                    </td>

                                    <td>
                                        {placa.modelo || "-"}
                                    </td>

                                    <td>

                                        {

                                            placa.fecha_expedicion
                                                ? placa.fecha_expedicion.substring(0, 10)
                                                : "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            placa.fecha_vigencia
                                                ? placa.fecha_vigencia.substring(0, 10)
                                                : "-"

                                        }

                                    </td>

                                    <td>

                                        $

                                        {

                                            Number(
                                                placa.monto_pago
                                            ).toFixed(2)

                                        }

                                    </td>

                                    <td>

                                        {

                                            Number(
                                                placa.requiere_renovacion
                                            ) === 1
                                                ? "Sí"
                                                : "No"

                                        }

                                    </td>

                                    <td>

                                        <span className={estadoClase}>

                                            {estadoTexto}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="acciones-cell">

                                            <button

                                                className="btn-accion btn-editar"

                                                onClick={() =>
                                                    onEditar(
                                                        placa.id_placa
                                                    )
                                                }

                                            >

                                                Editar

                                            </button>

                                            {

                                                placa.status !== "activa" && (

                                                    <button

                                                        className="btn-accion btn-estado-activar"

                                                        onClick={() =>
                                                            onEstado(
                                                                placa.id_placa,
                                                                "activa"
                                                            )
                                                        }

                                                    >

                                                        Activar

                                                    </button>

                                                )

                                            }

                                            {

                                                placa.status !== "vencida" && (

                                                    <button

                                                        className="btn-accion btn-estado-desactivar"

                                                        onClick={() =>
                                                            onEstado(
                                                                placa.id_placa,
                                                                "vencida"
                                                            )
                                                        }

                                                    >

                                                        Vencer

                                                    </button>

                                                )

                                            }

                                            {

                                                placa.status !== "cancelada" && (

                                                    <button

                                                        className="btn-accion btn-estado-desactivar"

                                                        onClick={() =>
                                                            onEstado(
                                                                placa.id_placa,
                                                                "cancelada"
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