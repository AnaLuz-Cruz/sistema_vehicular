export default function DetalleSolicitud({

    solicitud,

    cerrar

}) {


    if(!solicitud){

        return null;

    }



    return (

        <div>


            <h2>

                Detalle de Solicitud

            </h2>





            <p>

                <strong>

                    Usuario:

                </strong>

                {" "}

                {solicitud.usuario}

            </p>





            <p>

                <strong>

                    Correo:

                </strong>

                {" "}

                {solicitud.correo}

            </p>





            <p>

                <strong>

                    Unidad:

                </strong>

                {" "}

                {solicitud.cve}

                {" - "}

                {solicitud.marca}

                {" "}

                {solicitud.modelo}

            </p>





            <p>

                <strong>

                    Placa:

                </strong>

                {" "}

                {solicitud.placa || "Sin placa"}

            </p>





            <p>

                <strong>

                    Empresa:

                </strong>

                {" "}

                {solicitud.empresa}

            </p>





            <p>

                <strong>

                    Sucursal:

                </strong>

                {" "}

                {solicitud.sucursal}

            </p>





            <p>

                <strong>

                    Combustible:

                </strong>

                {" "}

                {solicitud.combustible}

            </p>





            <p>

                <strong>

                    Kilometraje:

                </strong>

                {" "}

                {solicitud.km_actual}

            </p>





            <p>

                <strong>

                    Litros solicitados:

                </strong>

                {" "}

                {solicitud.litros_solicitados}

                {" L"}

            </p>





            <p>

                <strong>

                    Método de pago:

                </strong>

                {" "}

                {solicitud.metodo_pago || "No definido"}

            </p>





            <p>

                <strong>

                    Actividad:

                </strong>

                {" "}

                {solicitud.actividad || "No definida"}

            </p>





            <p>

                <strong>

                    Estado:

                </strong>

                {" "}

                {solicitud.estado}

            </p>





            <p>

                <strong>

                    Observaciones:

                </strong>

                {" "}

                {solicitud.observaciones || "Sin observaciones"}

            </p>







            <h3>

                Evidencias

            </h3>







            {

                solicitud.foto_tablero &&


                <div>

                    <p>

                        Foto tablero

                    </p>


                    <img

                        src={solicitud.foto_tablero}

                        alt="Tablero"

                        width="200"

                    />


                </div>

            }







            {

                solicitud.foto_anticongelante &&


                <div>

                    <p>

                        Foto anticongelante

                    </p>


                    <img

                        src={solicitud.foto_anticongelante}

                        alt="Anticongelante"

                        width="200"

                    />


                </div>

            }








            {

                solicitud.foto_balloneta &&


                <div>

                    <p>

                        Foto balloneta

                    </p>


                    <img

                        src={solicitud.foto_balloneta}

                        alt="Balloneta"

                        width="200"

                    />


                </div>

            }








            {

                solicitud.foto_frenos &&


                <div>

                    <p>

                        Foto frenos

                    </p>


                    <img

                        src={solicitud.foto_frenos}

                        alt="Frenos"

                        width="200"

                    />


                </div>

            }








            {

                solicitud.foto_motor &&


                <div>

                    <p>

                        Foto motor

                    </p>


                    <img

                        src={solicitud.foto_motor}

                        alt="Motor"

                        width="200"

                    />


                </div>

            }








            <button

                onClick={cerrar}

            >

                Cerrar

            </button>



        </div>

    );

}