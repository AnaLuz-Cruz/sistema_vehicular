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

        <table>

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

                    prestamos.map((prestamo)=>(


                        <tr

                            key={prestamo.id_historial}

                        >


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

                                    prestamo.fecha_inicio.substring(0,10)

                                    :

                                    "-"

                                }

                            </td>



                            <td>

                                {

                                    prestamo.fecha_fin

                                    ?

                                    prestamo.fecha_fin.substring(0,10)

                                    :

                                    "-"

                                }

                            </td>



                            <td>

                                {

                                    prestamo.estado

                                }

                            </td>



                            <td>


                                <button

                                    onClick={()=>


                                        onEditar(

                                            prestamo.id_historial

                                        )


                                    }

                                >

                                    Editar

                                </button>




                                {

                                    prestamo.estado !== "aprobado"

                                    &&

                                    <button

                                        onClick={()=>


                                            onEstado(

                                                prestamo.id_historial,

                                                "aprobado"

                                            )


                                        }

                                    >

                                        Aprobar

                                    </button>

                                }




                                {

                                    prestamo.estado !== "entregado"

                                    &&

                                    <button

                                        onClick={()=>


                                            onEstado(

                                                prestamo.id_historial,

                                                "entregado"

                                            )


                                        }

                                    >

                                        Entregar

                                    </button>

                                }




                                {

                                    prestamo.estado !== "devuelto"

                                    &&

                                    <button

                                        onClick={()=>


                                            onEstado(

                                                prestamo.id_historial,

                                                "devuelto"

                                            )


                                        }

                                    >

                                        Devolver

                                    </button>

                                }




                                {

                                    prestamo.estado !== "cancelado"

                                    &&

                                    <button

                                        onClick={()=>


                                            onEstado(

                                                prestamo.id_historial,

                                                "cancelado"

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