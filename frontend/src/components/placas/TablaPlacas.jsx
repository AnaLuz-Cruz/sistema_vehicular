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

        <table>

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

                    placas.map((placa) => (

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

                                {

                                    placa.status === "activa"

                                        ? "Activa"

                                        : placa.status === "vencida"

                                        ? "Vencida"

                                        : "Cancelada"

                                }

                            </td>

                            <td>

                                <button

                                    onClick={() =>

                                        onEditar(
                                            placa.id_placa
                                        )

                                    }

                                >

                                    Editar

                                </button>

                                {

                                    placa.status !== "activa"

                                        &&

                                        <button

                                            onClick={() =>

                                                onEstado(

                                                    placa.id_placa,

                                                    "activa"

                                                )

                                            }

                                        >

                                            Activar

                                        </button>

                                }

                                {

                                    placa.status !== "vencida"

                                        &&

                                        <button

                                            onClick={() =>

                                                onEstado(

                                                    placa.id_placa,

                                                    "vencida"

                                                )

                                            }

                                        >

                                            Vencer

                                        </button>

                                }

                                {

                                    placa.status !== "cancelada"

                                        &&

                                        <button

                                            onClick={() =>

                                                onEstado(

                                                    placa.id_placa,

                                                    "cancelada"

                                                )

                                            }

                                        >

                                            Cancelar

                                        </button>

                                }

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}