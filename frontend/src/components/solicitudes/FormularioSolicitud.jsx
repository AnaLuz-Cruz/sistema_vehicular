import { useEffect, useState } from "react";


export default function FormularioSolicitud({

    usuarios,

    unidades,

    combustibles,

    creditos,

    transferencias,

    onGuardar,

    onCancelar

}) {



    const [formulario,setFormulario]=useState({

        id_usuario:"",

        id_vehiculo:"",

        km_actual:"",

        litros_solicitados:"",

        id_combustible:"",

        id_metodo:"",

        observaciones:"",

        id_credito:"",

        id_transferencia:"",

        nombre_gasolinera:"",

        foto_tablero:"",

        foto_anticongelante:"",

        foto_balloneta:"",

        foto_frenos:"",

        foto_motor:""

    });








    const cambiarCampo=(e)=>{


        const {

            name,

            value

        } = e.target;



        setFormulario({

            ...formulario,

            [name]:value

        });


    };









    const guardar=(e)=>{


        e.preventDefault();



        onGuardar(formulario);



    };








    return (

        <form onSubmit={guardar}>


            <h3>

                Nueva Solicitud de Combustible

            </h3>







            <label>

                Usuario

            </label>



            <select

                name="id_usuario"

                value={formulario.id_usuario}

                onChange={cambiarCampo}

                required

            >

                <option value="">

                    Seleccione usuario

                </option>



                {

                    usuarios.map(usuario=>(


                        <option

                            key={usuario.id_usuario}

                            value={usuario.id_usuario}

                        >

                            {usuario.nombre}

                        </option>


                    ))

                }


            </select>









            <label>

                Unidad

            </label>



            <select

                name="id_vehiculo"

                value={formulario.id_vehiculo}

                onChange={cambiarCampo}

                required

            >


                <option value="">

                    Seleccione unidad

                </option>



                {

                    unidades.map(unidad=>(


                        <option

                            key={unidad.id_unidad}

                            value={unidad.id_unidad}

                        >

                            {unidad.cve} -

                            {unidad.marca}

                            {" "}

                            {unidad.modelo}


                        </option>


                    ))

                }


            </select>









            <label>

                Kilometraje actual

            </label>


            <input

                type="number"

                name="km_actual"

                value={formulario.km_actual}

                onChange={cambiarCampo}

                required

            />









            <label>

                Litros solicitados

            </label>


            <input

                type="number"

                step="0.01"

                name="litros_solicitados"

                value={formulario.litros_solicitados}

                onChange={cambiarCampo}

                max="30"

                required

            />









            <label>

                Combustible

            </label>


            <select

                name="id_combustible"

                value={formulario.id_combustible}

                onChange={cambiarCampo}

                required

            >

                <option value="">

                    Seleccione combustible

                </option>



                {

                    combustibles.map(combustible=>(


                        <option

                            key={combustible.id_combustible}

                            value={combustible.id_combustible}

                        >

                            {combustible.nombre}

                        </option>


                    ))

                }


            </select>









            <label>

                Método de pago

            </label>


            <select

                name="id_metodo"

                value={formulario.id_metodo}

                onChange={cambiarCampo}

            >

                <option value="">

                    Seleccione método

                </option>


                <option value="1">

                    Crédito

                </option>


                <option value="2">

                    Transferencia

                </option>


                <option value="3">

                    Efectivo

                </option>


            </select>









            <label>

                Crédito

            </label>


            <select

                name="id_credito"

                value={formulario.id_credito}

                onChange={cambiarCampo}

            >

                <option value="">

                    Seleccione crédito

                </option>



                {

                    creditos.map(credito=>(


                        <option

                            key={credito.id_credito}

                            value={credito.id_credito}

                        >

                            {credito.nombre_credito}

                        </option>


                    ))

                }


            </select>









            <label>

                Gasolinera transferencia

            </label>


            <select

                name="id_transferencia"

                value={formulario.id_transferencia}

                onChange={cambiarCampo}

            >

                <option value="">

                    Seleccione gasolinera

                </option>



                {

                    transferencias.map(item=>(


                        <option

                            key={item.id_transferencia}

                            value={item.id_transferencia}

                        >

                            {item.nombre_gasolinera}

                        </option>


                    ))

                }


            </select>









            <label>

                Nombre gasolinera

            </label>


            <input

                type="text"

                name="nombre_gasolinera"

                value={formulario.nombre_gasolinera}

                onChange={cambiarCampo}

            />









            <label>

                Observaciones

            </label>


            <textarea

                name="observaciones"

                value={formulario.observaciones}

                onChange={cambiarCampo}

            />









            <h4>

                Evidencias

            </h4>



            <input

                type="text"

                name="foto_tablero"

                placeholder="URL foto tablero"

                value={formulario.foto_tablero}

                onChange={cambiarCampo}

            />



            <input

                type="text"

                name="foto_anticongelante"

                placeholder="URL anticongelante"

                value={formulario.foto_anticongelante}

                onChange={cambiarCampo}

            />



            <input

                type="text"

                name="foto_balloneta"

                placeholder="URL balloneta"

                value={formulario.foto_balloneta}

                onChange={cambiarCampo}

            />



            <input

                type="text"

                name="foto_frenos"

                placeholder="URL frenos"

                value={formulario.foto_frenos}

                onChange={cambiarCampo}

            />



            <input

                type="text"

                name="foto_motor"

                placeholder="URL motor"

                value={formulario.foto_motor}

                onChange={cambiarCampo}

            />








            <button type="submit">

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