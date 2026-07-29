import { useState } from "react";


export default function FormularioUnidad({

    unidad,

    empresas,

    sucursales,

    combustibles,

    onGuardar,

    onCancelar

}) {



    const [form,setForm] = useState(


        unidad ||

        {

            cve:"",
            marca:"",
            anio:"",
            version:"",
            tipo:"",
            clase:"",
            modelo:"",
            niv:"",
            motor:"",
            transmision:"",

            id_combustible:"",

            color:"",
            telefono_gps:"",
            sim_gps:"",
            uid:"",

            propietario:"",
            compra_arrendado:"",

            id_empresa:"",
            id_sucursal:"",

            fecha_adquisicion:"",

            kilometraje_actual:0,

            litros_actuales:0,

            capacidad_tanque:0,

            kilometraje_por_litro:"",

            id_credito:"",

            es_utilitario:"No Utilitario"

        }

    );




    const cambiar=(e)=>{


        setForm({

            ...form,

            [e.target.name]:
            e.target.value

        });


    };





    const enviar=(e)=>{

        e.preventDefault();


        onGuardar(form);


    };





return (


<form onSubmit={enviar}>


<h2>

{
unidad
?
"Editar Unidad"
:
"Nueva Unidad"

}

</h2>



<input

name="cve"

placeholder="Clave unidad"

value={form.cve}

onChange={cambiar}

/>



<input

name="marca"

placeholder="Marca"

value={form.marca}

onChange={cambiar}

/>



<input

name="anio"

placeholder="Año"

type="number"

value={form.anio}

onChange={cambiar}

/>



<input

name="version"

placeholder="Versión"

value={form.version}

onChange={cambiar}

/>





<select

name="tipo"

value={form.tipo}

onChange={cambiar}

>


<option value="">
Tipo vehículo
</option>


<option value="Sedan">
Sedan
</option>


<option value="Pickup">
Pickup
</option>


<option value="Camioneta">
Camioneta
</option>


<option value="Motocicleta">
Motocicleta
</option>


<option value="Otro">
Otro
</option>


</select>





<select

name="clase"

value={form.clase}

onChange={cambiar}

>


<option value="">
Clase
</option>


<option value="Ligero">
Ligero
</option>


<option value="Pesado">
Pesado
</option>


<option value="Utilitario">
Utilitario
</option>


</select>






<input

name="modelo"

placeholder="Modelo"

value={form.modelo}

onChange={cambiar}

/>





<input

name="niv"

placeholder="NIV"

value={form.niv}

onChange={cambiar}

/>





<input

name="motor"

placeholder="Motor"

value={form.motor}

onChange={cambiar}

/>





<input

name="transmision"

placeholder="Transmisión"

value={form.transmision}

onChange={cambiar}

/>





<select

name="id_combustible"

value={form.id_combustible}

onChange={cambiar}

>


<option value="">

Combustible

</option>


{

combustibles.map(c=>(


<option

key={c.id_combustible}

value={c.id_combustible}

>

{c.nombre}

</option>


))


}


</select>







<input

name="color"

placeholder="Color"

value={form.color}

onChange={cambiar}

/>





<input

name="telefono_gps"

placeholder="Teléfono GPS"

value={form.telefono_gps}

onChange={cambiar}

/>





<input

name="sim_gps"

placeholder="SIM GPS"

value={form.sim_gps}

onChange={cambiar}

/>





<input

name="uid"

placeholder="UID GPS"

value={form.uid}

onChange={cambiar}

/>






<input

name="propietario"

placeholder="Propietario"

value={form.propietario}

onChange={cambiar}

/>





<select

name="compra_arrendado"

value={form.compra_arrendado}

onChange={cambiar}

>


<option value="">
Compra / Arrendado
</option>


<option value="Compra">
Compra
</option>


<option value="Arrendado">
Arrendado
</option>


</select>







<select

name="id_empresa"

value={form.id_empresa}

onChange={cambiar}

>


<option value="">
Empresa
</option>


{

empresas.map(e=>(

<option

key={e.id_empresa}

value={e.id_empresa}

>

{e.razon_social}

</option>


))


}


</select>







<select

name="id_sucursal"

value={form.id_sucursal}

onChange={cambiar}

>


<option value="">
Sucursal
</option>


{

sucursales.map(s=>(

<option

key={s.id_sucursal}

value={s.id_sucursal}

>

{s.nombre}

</option>


))


}


</select>







<input

type="date"

name="fecha_adquisicion"

value={form.fecha_adquisicion}

onChange={cambiar}

/>





<input

type="number"

name="kilometraje_actual"

placeholder="Kilometraje actual"

value={form.kilometraje_actual}

onChange={cambiar}

/>





<input

type="number"

name="litros_actuales"

placeholder="Litros actuales"

value={form.litros_actuales}

onChange={cambiar}

/>





<input

type="number"

name="capacidad_tanque"

placeholder="Capacidad tanque"

value={form.capacidad_tanque}

onChange={cambiar}

/>





<input

type="number"

step="0.01"

name="kilometraje_por_litro"

placeholder="Km por litro"

value={form.kilometraje_por_litro}

onChange={cambiar}

/>





<input

name="id_credito"

placeholder="ID Crédito"

value={form.id_credito}

onChange={cambiar}

/>





<select

name="es_utilitario"

value={form.es_utilitario}

onChange={cambiar}

>


<option value="No Utilitario">
No Utilitario
</option>


<option value="Utilitario">
Utilitario
</option>


</select>






<button>

Guardar

</button>



<button

type="button"

onClick={onCancelar}

>

Cancelar

</button>



</form>


);


}