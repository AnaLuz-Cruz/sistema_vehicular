export default function TablaEmpresas({

    empresas,

    onEditar,

    onEstado

}) {

    return (

        <table border="1">

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

                        const activa =
                            empresa.estatus === "Activa";

                        return (

                            <tr
                                key={empresa.id_empresa}
                            >

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
                                    {empresa.estatus}
                                </td>

                                <td>

                                    <button

                                        onClick={() =>
                                            onEditar(
                                                empresa.id_empresa
                                            )
                                        }

                                    >

                                        Editar

                                    </button>

                                    <button

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

                                </td>

                            </tr>

                        );

                    })

                }

            </tbody>

        </table>

    );

}