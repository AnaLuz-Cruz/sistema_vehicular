import "../../styles/Tabla.css";


export default function TablaUnidades({

    unidades,

    onVer,

    onEditar,

    onEstado

}) {


    return (

        <div className="tabla-container">


            <table className="tabla-usuarios">


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

                        unidades.map((unidad) => {


                            const activa = Number(unidad.estado) === 1;


                            return (


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
                                            unidad.placas || "Sin placa"
                                        }

                                    </td>



                                    <td>
                                        {unidad.kilometraje_actual}
                                    </td>



                                    <td>

                                        {
                                            unidad.kilometraje_por_litro || "-"
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


                                        <span

                                            className={
                                                activa
                                                ? "badge badge-activo"
                                                : "badge badge-inactivo"
                                            }

                                        >

                                            {
                                                activa
                                                ? "Activa"
                                                : "Inactiva"
                                            }


                                        </span>


                                    </td>



                                    <td>


                                        <div className="acciones-cell">



                                            <button

                                                className="btn-accion btn-editar"

                                                onClick={() =>
                                                    onVer(
                                                        unidad.id_unidad
                                                    )
                                                }

                                            >

                                                Ver más

                                            </button>




                                            <button

                                                className="btn-accion btn-editar"

                                                onClick={() =>
                                                    onEditar(
                                                        unidad.id_unidad
                                                    )
                                                }

                                            >

                                                Editar

                                            </button>





                                            <button

                                                className={

                                                    activa

                                                    ?

                                                    "btn-accion btn-estado-desactivar"

                                                    :

                                                    "btn-accion btn-estado-activar"

                                                }


                                                onClick={() =>

                                                    onEstado(

                                                        unidad.id_unidad,

                                                        activa ? 0 : 1

                                                    )

                                                }


                                            >

                                                {

                                                    activa

                                                    ?

                                                    "Desactivar"

                                                    :

                                                    "Activar"

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