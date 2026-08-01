import "../../styles/Tabla.css";

export default function TablaCreditos({

    creditos,

    onEditar,

    onEstado

}) {


    if (creditos.length === 0) {

        return (

            <p>

                No hay créditos registrados.

            </p>

        );

    }


    return (

        <div className="tabla-container">

            <table className="tabla-usuarios">

                <thead>

                    <tr>

                        <th>Nombre</th>
                        <th>RFC</th>
                        <th>Teléfono</th>
                        <th>Inicio convenio</th>
                        <th>Vigencia</th>
                        <th>Límite crédito</th>
                        <th>Estado</th>
                        <th>Acciones</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        creditos.map((credito) => {

                            const activo = Number(credito.estado) === 1;

                            return (

                                <tr key={credito.id_credito}>


                                    <td>

                                        {credito.nombre_credito}

                                    </td>


                                    <td>

                                        {credito.rfc || "-"}

                                    </td>


                                    <td>

                                        {credito.telefono || "-"}

                                    </td>


                                    <td>

                                        {

                                            credito.inicio_convenio

                                                ? credito.inicio_convenio.substring(0, 10)

                                                : "-"

                                        }

                                    </td>


                                    <td>

                                        {credito.vigencia || "-"}

                                    </td>


                                    <td>

                                        {

                                            credito.limite_credito

                                                ?

                                                `$${Number(
                                                    credito.limite_credito
                                                ).toLocaleString("es-MX", {
                                                    minimumFractionDigits: 2
                                                })}`

                                                :

                                                "$0.00"

                                        }

                                    </td>


                                    <td>

                                        <span
                                            className={
                                                activo
                                                    ? "badge badge-activo"
                                                    : "badge badge-inactivo"
                                            }
                                        >

                                            {
                                                activo
                                                    ? "Activo"
                                                    : "Inactivo"
                                            }

                                        </span>

                                    </td>


                                    <td>

                                        <div className="acciones-cell">

                                            <button

                                                className="btn-accion btn-editar"

                                                onClick={() =>
                                                    onEditar(
                                                        credito.id_credito
                                                    )
                                                }

                                            >

                                                Editar

                                            </button>


                                            <button

                                                className={
                                                    activo
                                                        ? "btn-accion btn-estado-desactivar"
                                                        : "btn-accion btn-estado-activar"
                                                }

                                                onClick={() =>
                                                    onEstado(
                                                        credito.id_credito,
                                                        activo ? 0 : 1
                                                    )
                                                }

                                            >

                                                {
                                                    activo
                                                        ? "Desactivar"
                                                        : "Activar"
                                                }

                                            </button>

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