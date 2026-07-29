export default function TablaTransferencias({

    transferencias,

    onEditar

}) {


    if (transferencias.length === 0) {

        return (

            <p>

                No hay gasolineras registradas.

            </p>

        );

    }



    return (

        <table>

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Gasolinera</th>

                    <th>Acciones</th>

                </tr>

            </thead>


            <tbody>

                {

                    transferencias.map((transferencia)=>(


                        <tr

                            key={
                                transferencia.id_transferencia
                            }

                        >


                            <td>

                                {
                                    transferencia.id_transferencia
                                }

                            </td>



                            <td>

                                {
                                    transferencia.nombre_gasolinera
                                }

                            </td>




                            <td>


                                <button

                                    onClick={()=>


                                        onEditar(

                                            transferencia.id_transferencia

                                        )


                                    }

                                >

                                    Editar

                                </button>



                            </td>


                        </tr>


                    ))

                }

            </tbody>


        </table>

    );

}