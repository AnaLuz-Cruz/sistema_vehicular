export default function TablaSucursales({

    sucursales,

    onEditar,

    onEstado

}) {


    return (


        <table border="1">

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

                    sucursales.map((sucursal)=>(

                        <tr key={ sucursal.id_sucursal}>
                            <td>{ sucursal.id_sucursal}</td>
                            <td> { sucursal.nombre } </td>
                            <td> { sucursal.empresa } </td>
                            <td> { sucursal.direccion } </td>
                            <td> { sucursal.telefono } </td>
                            <td> { sucursal.correo } </td>
                            <td> { sucursal.horario } </td>
                            <td>
                                {
                                    Number(sucursal.estado) === 1
                                    ?
                                    "Activa"
                                    :
                                    "Inactiva"
                                }
                            </td>
                            <td>
                                <button onClick={()=> onEditar( sucursal.id_sucursal ) }>
                                    Editar
                                </button>
                                <button onClick={()=> onEstado( sucursal.id_sucursal,
                                            Number(sucursal.estado) === 1 ? 0 : 1)} >
                                    {
                                        Number(sucursal.estado) === 1 ? "Desactivar" : "Activar"
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