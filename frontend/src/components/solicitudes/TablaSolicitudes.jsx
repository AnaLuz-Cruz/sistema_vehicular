export default function TablaSolicitudes({

    solicitudes,

    onDetalle,

    onEstado

}) {


    if(solicitudes.length===0){

        return (

            <p>

                No hay solicitudes registradas.

            </p>

        );

    }



    return (

        <table>


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

                    solicitudes.map((solicitud)=>(


                        <tr

                            key={solicitud.id_solicitud}

                        >


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

                                {solicitud.litros_solicitados}

                                {" L"}

                            </td>



                            <td>

                                {solicitud.km_actual}

                            </td>



                            <td>

                                {

                                    solicitud.fecha_solicitud

                                    ?

                                    solicitud.fecha_solicitud.substring(0,10)

                                    :

                                    "-"

                                }

                            </td>



                            <td>

                                {solicitud.estado}

                            </td>




                            <td>


                                <button

                                    onClick={()=>


                                        onDetalle(

                                            solicitud.id_solicitud

                                        )


                                    }

                                >

                                    Ver detalle

                                </button>






                                {

                                    solicitud.estado === "Pendiente"

                                    &&


                                    <>


                                        <button

                                            onClick={()=>


                                                onEstado(

                                                    solicitud.id_solicitud,

                                                    "Aprobada"

                                                )


                                            }

                                        >

                                            Aprobar

                                        </button>





                                        <button

                                            onClick={()=>


                                                onEstado(

                                                    solicitud.id_solicitud,

                                                    "Rechazada"

                                                )


                                            }

                                        >

                                            Rechazar

                                        </button>


                                    </>

                                }





                                {

                                    solicitud.estado === "Aprobada"

                                    &&


                                    <button

                                        onClick={()=>


                                            onEstado(

                                                solicitud.id_solicitud,

                                                "Finalizado"

                                            )


                                        }

                                    >

                                        Finalizar

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