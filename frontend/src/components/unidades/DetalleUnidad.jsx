export default function DetalleUnidad({

    unidad,

    onCerrar

}) {

    if (!unidad) return null;

    return (

        <div className="modal">

            <h2>Detalle de la Unidad</h2>

            {

                unidad.foto_url

                ?

                <img
                    src={unidad.foto_url}
                    alt="Unidad"
                    width="250"
                />

                :

                <p>Sin fotografía</p>

            }

            <table>

                <tbody>

                    <tr>
                        <td><b>Clave</b></td>
                        <td>{unidad.cve}</td>
                    </tr>

                    <tr>
                        <td><b>Marca</b></td>
                        <td>{unidad.marca}</td>
                    </tr>

                    <tr>
                        <td><b>Modelo</b></td>
                        <td>{unidad.modelo}</td>
                    </tr>

                    <tr>
                        <td><b>Versión</b></td>
                        <td>{unidad.version}</td>
                    </tr>

                    <tr>
                        <td><b>Año</b></td>
                        <td>{unidad.anio}</td>
                    </tr>

                    <tr>
                        <td><b>Tipo</b></td>
                        <td>{unidad.tipo}</td>
                    </tr>

                    <tr>
                        <td><b>Clase</b></td>
                        <td>{unidad.clase}</td>
                    </tr>

                    <tr>
                        <td><b>NIV</b></td>
                        <td>{unidad.niv}</td>
                    </tr>

                    <tr>
                        <td><b>Motor</b></td>
                        <td>{unidad.motor}</td>
                    </tr>

                    <tr>
                        <td><b>Transmisión</b></td>
                        <td>{unidad.transmision}</td>
                    </tr>

                    <tr>
                        <td><b>Empresa</b></td>
                        <td>{unidad.empresa}</td>
                    </tr>

                    <tr>
                        <td><b>Sucursal</b></td>
                        <td>{unidad.sucursal}</td>
                    </tr>

                    <tr>
                        <td><b>Combustible</b></td>
                        <td>{unidad.combustible}</td>
                    </tr>

                    <tr>
                        <td><b>Km</b></td>
                        <td>{unidad.kilometraje_actual}</td>
                    </tr>

                    <tr>
                        <td><b>Litros actuales</b></td>
                        <td>{unidad.litros_actuales}</td>
                    </tr>

                    <tr>
                        <td><b>Capacidad</b></td>
                        <td>{unidad.capacidad_tanque}</td>
                    </tr>

                    <tr>
                        <td><b>Km/L</b></td>
                        <td>{unidad.kilometraje_por_litro}</td>
                    </tr>

                    <tr>
                        <td><b>Color</b></td>
                        <td>{unidad.color}</td>
                    </tr>

                    <tr>
                        <td><b>GPS</b></td>
                        <td>{unidad.telefono_gps}</td>
                    </tr>

                    <tr>
                        <td><b>SIM</b></td>
                        <td>{unidad.sim_gps}</td>
                    </tr>

                    <tr>
                        <td><b>Responsable</b></td>
                        <td>{unidad.responsable}</td>
                    </tr>

                    <tr>
                        <td><b>Propietario</b></td>
                        <td>{unidad.propietario}</td>
                    </tr>

                    <tr>
                        <td><b>Compra</b></td>
                        <td>{unidad.compra_arrendado}</td>
                    </tr>

                    <tr>
                        <td><b>Fecha adquisición</b></td>
                        <td>{unidad.fecha_adquisicion}</td>
                    </tr>

                </tbody>

            </table>

            <button onClick={onCerrar}>

                Cerrar

            </button>

        </div>

    );

}