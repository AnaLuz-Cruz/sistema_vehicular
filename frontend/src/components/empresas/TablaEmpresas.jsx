import "../../styles/Tabla.css"; // cambia la ruta si tu archivo tiene otro nombre


export default function TablaEmpresas({

    empresas,

    onEditar,

    onEstado

}) {


    return (

        <div className="tabla-container">

            <table className="tabla-usuarios">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Razón Social</th>
                        <th>RFC</th>
                        <th>Nombre Comercial</th>
                        <th>Régimen Fiscal</th>
                        <th>Actividad Económica</th>
                        <th>Estatus</th>
                        <th>Acciones</th>

                    </tr>

                </thead>


                <tbody>

                    {
                        empresas.map((empresa) => {

                            const activa = empresa.estatus === "Activa";


                            return (

                                <tr key={empresa.id_empresa}>


                                    <td>
                                        {empresa.id_empresa}
                                    </td>


                                    <td>
                                        {empresa.razon_social}
                                    </td>


                                    <td>
                                        {empresa.rfc}
                                    </td>


                                    <td>
                                        {empresa.nombre_comercial}
                                    </td>


                                    <td>
                                        {empresa.regimen_fiscal}
                                    </td>


                                    <td>
                                        {empresa.actividad_economica}
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
                                                empresa.estatus
                                            }

                                        </span>

                                    </td>


                                    <td>

                                        <div className="acciones-cell">


                                            <button

                                                className="btn-accion btn-editar"

                                                onClick={() =>
                                                    onEditar(
                                                        empresa.id_empresa
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
                                                        empresa.id_empresa,
                                                        activa
                                                        ? "Inactiva"
                                                        : "Activa"
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