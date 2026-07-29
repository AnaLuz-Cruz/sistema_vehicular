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

        <table>

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

                    creditos.map((credito) => (

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

                                        ? credito.inicio_convenio.substring(0,10)

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

                                {

                                    Number(credito.estado) === 1

                                        ?

                                        "Activo"

                                        :

                                        "Inactivo"

                                }

                            </td>


                            <td>


                                <button

                                    onClick={() =>

                                        onEditar(

                                            credito.id_credito

                                        )

                                    }

                                >

                                    Editar

                                </button>


                                {


                                    Number(credito.estado) === 1

                                    ?

                                    <button

                                        onClick={() =>

                                            onEstado(

                                                credito.id_credito,

                                                0

                                            )

                                        }

                                    >

                                        Desactivar

                                    </button>


                                    :


                                    <button

                                        onClick={() =>

                                            onEstado(

                                                credito.id_credito,

                                                1

                                            )

                                        }

                                    >

                                        Activar

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