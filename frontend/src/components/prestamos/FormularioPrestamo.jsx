import { useEffect, useState } from "react";


export default function FormularioPrestamo({

    prestamo,

    usuarios,

    unidades,

    onGuardar,

    onCancelar

}) {


    const [formulario, setFormulario] = useState({

        id_usuario: "",

        id_vehiculo: "",

        fecha_inicio: "",

        fecha_fin: "",

        firma_desasignacion: "",

        estado: "pendiente"

    });





    useEffect(() => {


        if(prestamo){


            setFormulario({

                id_usuario:

                    prestamo.id_usuario || "",


                id_vehiculo:

                    prestamo.id_vehiculo || "",


                fecha_inicio:

                    prestamo.fecha_inicio

                    ?

                    prestamo.fecha_inicio.substring(0,10)

                    :

                    "",



                fecha_fin:

                    prestamo.fecha_fin

                    ?

                    prestamo.fecha_fin.substring(0,10)

                    :

                    "",



                firma_desasignacion:

                    prestamo.firma_desasignacion || "",



                estado:

                    prestamo.estado || "pendiente"


            });


        }


    },[prestamo]);







    const handleChange=(e)=>{


        const {name,value}=e.target;



        setFormulario({

            ...formulario,

            [name]:value

        });


    };







    const handleSubmit=(e)=>{


        e.preventDefault();


        onGuardar(formulario);


    };







    return (

        <form onSubmit={handleSubmit}>


            <h3>

                {

                    prestamo

                    ?

                    "Editar Préstamo"

                    :

                    "Nuevo Préstamo"

                }

            </h3>





            <label>

                Usuario

            </label>



            <select

                name="id_usuario"

                value={formulario.id_usuario}

                onChange={handleChange}

                required

            >


                <option value="">

                    Seleccione usuario

                </option>



                {

                    usuarios.map((usuario)=>(


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

                onChange={handleChange}

                required

            >


                <option value="">

                    Seleccione unidad

                </option>



                {

                    unidades.map((unidad)=>(


                        <option

                            key={unidad.id_unidad}

                            value={unidad.id_unidad}

                        >

                            {unidad.cve} -

                            {unidad.marca} 

                            {unidad.modelo}


                        </option>


                    ))

                }


            </select>







            <label>

                Fecha inicio

            </label>



            <input

                type="date"

                name="fecha_inicio"

                value={formulario.fecha_inicio}

                onChange={handleChange}

            />






            {

                prestamo &&

                <>


                    <label>

                        Fecha fin

                    </label>


                    <input

                        type="date"

                        name="fecha_fin"

                        value={formulario.fecha_fin}

                        onChange={handleChange}

                    />



                    <label>

                        Firma desasignación

                    </label>


                    <input

                        type="text"

                        name="firma_desasignacion"

                        placeholder="URL firma"

                        value={formulario.firma_desasignacion}

                        onChange={handleChange}

                    />



                    <label>

                        Estado

                    </label>



                    <select

                        name="estado"

                        value={formulario.estado}

                        onChange={handleChange}

                    >


                        <option value="pendiente">

                            Pendiente

                        </option>


                        <option value="aprobado">

                            Aprobado

                        </option>


                        <option value="entregado">

                            Entregado

                        </option>


                        <option value="devuelto">

                            Devuelto

                        </option>


                        <option value="cancelado">

                            Cancelado

                        </option>


                    </select>


                </>

            }







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