import "../../styles/Tabla.css";


export default function TablaSucursales({

    sucursales,

    onEditar,

    onEstado

}) {


    return (

        <div className="tabla-container">

            <table className="tabla-usuarios">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Horario</th>
                        <th>Estado</th>
                        <th>Acciones</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        sucursales.map((sucursal) => {


                            const activa = Number(sucursal.estado) === 1;


                            return (

                                <tr key={sucursal.id_sucursal}>


                                    <td>
                                        {sucursal.id_sucursal}
                                    </td>


                                    <td>
                                        {sucursal.nombre}
                                    </td>


                                    <td>
                                        {sucursal.empresa}
                                    </td>


                                    <td>
                                        {sucursal.direccion}
                                    </td>


                                    <td>
                                        {sucursal.telefono}
                                    </td>


                                    <td>
                                        {sucursal.correo}
                                    </td>


                                    <td>
                                        {sucursal.horario}
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
                                                    onEditar(
                                                        sucursal.id_sucursal
                                                    )
                                                }

                                            >

                                                Editar

                                            </button>



                                            <button

                                                className={
                                                    activa
                                                    ? "btn-accion btn-estado-desactivar"
                                                    : "btn-accion btn-estado-activar"
                                                }


                                                onClick={() =>
                                                    onEstado(
                                                        sucursal.id_sucursal,
                                                        activa ? 0 : 1
                                                    )
                                                }

                                            >

                                                {
                                                    activa
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