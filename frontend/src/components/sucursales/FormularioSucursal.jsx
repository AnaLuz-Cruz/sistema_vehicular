import {
    useEffect,
    useState
} from "react";


export default function FormularioSucursal({

    sucursal,

    empresas,

    onGuardar,

    onCancelar

}) {


    const [form,setForm] = useState({

        nombre:"",
        direccion:"",
        telefono:"",
        correo:"",
        horario:"",
        id_empresa:""

    });




    useEffect(()=>{


        if(sucursal){


            setForm({

                nombre:
                    sucursal.nombre || "",


                direccion:
                    sucursal.direccion || "",


                telefono:
                    sucursal.telefono || "",


                correo:
                    sucursal.correo || "",


                horario:
                    sucursal.horario || "",


                id_empresa:
                    sucursal.id_empresa || ""

            });


        }


    },[sucursal]);






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






    return(


        <form onSubmit={enviar}>


            <h2>

                {
                    sucursal
                    ?
                    "Editar Sucursal"
                    :
                    "Nueva Sucursal"
                }

            </h2>





            <input

                name="nombre"

                placeholder="Nombre sucursal"

                value={form.nombre}

                onChange={cambiar}

            />





            <input

                name="direccion"

                placeholder="Dirección"

                value={form.direccion}

                onChange={cambiar}

            />





            <input

                name="telefono"

                placeholder="Teléfono"

                value={form.telefono}

                onChange={cambiar}

            />





            <input

                name="correo"

                placeholder="Correo"

                value={form.correo}

                onChange={cambiar}

            />





            <input

                name="horario"

                placeholder="Horario"

                value={form.horario}

                onChange={cambiar}

            />






            <select

                name="id_empresa"

                value={form.id_empresa}

                onChange={cambiar}

            >


                <option value="">

                    Seleccione empresa

                </option>



                {

                    empresas.map((empresa)=>(


                        <option

                            key={
                                empresa.id_empresa
                            }

                            value={
                                empresa.id_empresa
                            }

                        >

                            {
                                empresa.razon_social
                            }

                        </option>


                    ))

                }


            </select>






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