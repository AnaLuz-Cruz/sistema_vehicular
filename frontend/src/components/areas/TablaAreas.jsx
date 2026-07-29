export default function TablaAreas({

    areas,

    onEditar,

    onEliminar

}){

    return(

        <table border="1">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Nombre</th>

                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody>

                {

                    areas.map((area)=>(

                        <tr key={area.id_area}>

                            <td>

                                {area.id_area}

                            </td>

                            <td>

                                {area.nombre}

                            </td>

                            <td>

                                <button

                                    onClick={()=>onEditar(area.id_area)}

                                >

                                    Editar

                                </button>

                                <button

                                    onClick={()=>onEliminar(area.id_area)}

                                >

                                    Eliminar

                                </button>

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}