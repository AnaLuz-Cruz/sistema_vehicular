export default function TablaUnidades({

    unidades,

    onVer,

    onEditar,

    onEstado

}) {


    return (

        <table border="1">

            <thead>

                <tr>

                    <th>CVE</th>

                    <th>Marca</th>

                    <th>Clase</th>

                    <th>Tipo</th>

                    <th>Modelo</th>

                    <th>Placas</th>

                    <th>Km Actual</th>

                    <th>Km/L</th>

                    <th>Capacidad</th>

                    <th>Foto</th>

                    <th>Estado</th>

                    <th>Acciones</th>


                </tr>


            </thead>



            <tbody>


                {

                    unidades.map((unidad)=>(


                        <tr key={unidad.id_unidad}>


                            <td>

                                {unidad.cve}

                            </td>


                            <td>

                                {unidad.marca}

                            </td>


                            <td>

                                {unidad.clase}

                            </td>


                            <td>

                                {unidad.tipo}

                            </td>


                            <td>

                                {unidad.modelo}

                            </td>


                            <td>

                                {
                                    unidad.placas
                                    ||
                                    "Sin placa"
                                }

                            </td>



                            <td>

                                {
                                    unidad.kilometraje_actual
                                }

                            </td>



                            <td>

                                {
                                    unidad.kilometraje_por_litro
                                    ||
                                    "-"
                                }

                            </td>



                            <td>

                                {
                                    unidad.capacidad_tanque
                                }
                                L

                            </td>



                            <td>


                                {

                                    unidad.foto

                                    ?

                                    <img

                                        src={unidad.foto_url}

                                        width="70"

                                        alt="unidad"

                                    />

                                    :

                                    "Sin foto"

                                }


                            </td>



                            <td>


                                {

                                    Number(unidad.estado) === 1

                                    ?

                                    "Activa"

                                    :

                                    "Inactiva"


                                }


                            </td>



                            <td>


                                <button
                                    onClick={()=> onVer( unidad.id_unidad )}

                                >
                                    Ver más
                                </button>



                                <button

                                    onClick={()=>


                                        onEditar(

                                            unidad.id_unidad

                                        )


                                    }

                                >

                                    Editar

                                </button>



                                <button

                                    onClick={()=>


                                        onEstado(

                                            unidad.id_unidad,

                                            Number(unidad.estado) === 1

                                            ?

                                            0

                                            :

                                            1

                                        )


                                    }

                                >


                                    {

                                        Number(unidad.estado) === 1

                                        ?

                                        "Desactivar"

                                        :

                                        "Activar"


                                    }


                                </button>



                            </td>


                        </tr>


                    ))

                }


            </tbody>


        </table>


    );

}