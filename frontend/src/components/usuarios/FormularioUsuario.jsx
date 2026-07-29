import {
    useEffect,
    useState
} from "react";


export default function FormularioUsuario({

    usuario,

    empresas,
    sucursales,
    areas,

    onGuardar,
    onCancelar

}){


    const formularioInicial = {

        nombre:"",
        usuario:"",
        password:"",
        correo:"",
        rol:"",
        id_empresa:"",
        id_sucursal:"",
        id_area:""

    };



    const [form,setForm] = useState(
        formularioInicial
    );



    // Cargar datos cuando es edición
    useEffect(()=>{


        if(usuario){


            setForm({

                nombre: usuario.nombre || "",
                usuario: usuario.usuario || "",
                password:"",
                correo: usuario.correo || "",
                rol: usuario.rol || "",
                id_empresa: usuario.id_empresa || "",
                id_sucursal: usuario.id_sucursal || "",
                id_area: usuario.id_area || ""
            });


        }else{

            setForm(formularioInicial);

        }


    },[usuario]);




    const cambiar = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({

            ...prev,

            [name]: value,

            ...(name === "id_empresa" && {

                id_sucursal: ""

            })

        }));

    };




    const enviar=(e)=>{

        e.preventDefault();


        if(usuario){


            // Solo campos permitidos por PUT

            onGuardar({

                nombre: form.nombre,
                correo: form.correo,
                rol: form.rol,
                id_empresa: form.id_empresa || null,
                id_sucursal: form.id_sucursal || null,
                id_area: form.id_area || null

            });


        }else{

            onGuardar({
                ...form,
                id_empresa: form.id_empresa || null,
                id_sucursal: form.id_sucursal || null,
                id_area: form.id_area || null
            });

        }


    };


    const sucursalesFiltradas = sucursales.filter(

        sucursal =>

            Number(sucursal.id_empresa) === Number(form.id_empresa)

    );    



    return(

        <form onSubmit={enviar}>


            <h2>

                {
                    usuario
                    ? "Editar Usuario"
                    : "Nuevo Usuario"
                }

            </h2>



            <input

                name="nombre"

                placeholder="Nombre"

                value={form.nombre}

                onChange={cambiar}

            />




            {
                !usuario &&

                <>

                    <input

                        name="usuario"

                        placeholder="Usuario"

                        value={form.usuario}

                        onChange={cambiar}

                    />



                    <input

                        type="password"

                        name="password"

                        placeholder="Contraseña"

                        value={form.password}

                        onChange={cambiar}

                    />

                </>

            }




            <input

                name="correo"

                placeholder="Correo"

                value={form.correo}

                onChange={cambiar}

            />




            <select

                name="rol"

                value={form.rol}

                onChange={cambiar}

            >

                <option value="">
                    Seleccione rol
                </option>

                <option value="Superusuario">
                    Superusuario
                </option>

                <option value="Administrador">
                    Administrador
                </option>

                <option value="Contabilidad">
                    Contabilidad
                </option>

                <option value="Conductor">
                    Conductor
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
                    disabled={!form.id_empresa}
                >

                <option value="">
                    Sucursal
                </option>


                {
                    sucursalesFiltradas.map(s=>(

                        <option

                            key={s.id_sucursal}

                            value={s.id_sucursal}

                        >

                            {s.nombre}

                        </option>

                    ))
                }


            </select>





            <select

                name="id_area"

                value={form.id_area}

                onChange={cambiar}

            >

                <option value="">
                    Área
                </option>


                {
                    areas.map(a=>(

                        <option

                            key={a.id_area}

                            value={a.id_area}

                        >

                            {a.nombre}

                        </option>

                    ))
                }


            </select>





            <button>

                {
                    usuario
                    ? "Actualizar"
                    : "Guardar"
                }

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