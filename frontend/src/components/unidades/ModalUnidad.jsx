export default function ModalUnidad({

unidad,

onCerrar

}){

if(!unidad)return null;

return(

<div className="modal">

<h2>

Unidad {unidad.cve}

</h2>

<p><b>Marca:</b> {unidad.marca}</p>

<p><b>Modelo:</b> {unidad.modelo}</p>

<p><b>Versión:</b> {unidad.version}</p>

<p><b>Clase:</b> {unidad.clase}</p>

<p><b>Tipo:</b> {unidad.tipo}</p>

<p><b>NIV:</b> {unidad.niv}</p>

<p><b>Motor:</b> {unidad.motor}</p>

<p><b>Transmisión:</b> {unidad.transmision}</p>

<p><b>Empresa:</b> {unidad.empresa}</p>

<p><b>Sucursal:</b> {unidad.sucursal}</p>

<p><b>Combustible:</b> {unidad.combustible}</p>

<p><b>Km:</b> {unidad.kilometraje_actual}</p>

<p><b>Capacidad:</b> {unidad.capacidad_tanque}</p>

<p><b>Km/L:</b> {unidad.kilometraje_por_litro}</p>

<p><b>GPS:</b> {unidad.telefono_gps}</p>

<p><b>SIM:</b> {unidad.sim_gps}</p>

<p><b>Responsable:</b> {unidad.responsable}</p>

{

unidad.foto_url &&

<img

src={unidad.foto_url}

width={300}

/>

}

<button

onClick={onCerrar}

>

Cerrar

</button>

</div>

);

}