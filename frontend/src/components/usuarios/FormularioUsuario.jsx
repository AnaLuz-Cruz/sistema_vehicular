import {
    useEffect,
    useState
} from "react";

import "../../styles/Formularios.css";


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


    const [form,setForm] = useState(formularioInicial);



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





    const cambiar=(e)=>{

        const {name,value}=e.target;


        setForm(prev=>({

            ...prev,

            [name]:value,


            ...(name==="id_empresa" && {

                id_sucursal:""

            })

        }));

    };





    const enviar=(e)=>{

        e.preventDefault();


        if(usuario){

            onGuardar({

                nombre:form.nombre,

                correo:form.correo,

                rol:form.rol,

                id_empresa:form.id_empresa || null,

                id_sucursal:form.id_sucursal || null,

                id_area:form.id_area || null

            });


        }else{


            onGuardar({

                ...form,

                id_empresa:form.id_empresa || null,

                id_sucursal:form.id_sucursal || null,

                id_area:form.id_area || null

            });

        }

    };





    const sucursalesFiltradas = sucursales.filter(

        sucursal =>

        Number(sucursal.id_empresa) === Number(form.id_empresa)

    );




    return(

        <form 
            className="formulario-usuario"
            onSubmit={enviar}
        >


            <div className="form-header">

                <h2>

                {
                    usuario
                    ? "Editar Usuario"
                    : "Nuevo Usuario"
                }

                </h2>

            </div>





            <div className="form-grid">



                <div className="campo-form">

                    <label>
                        Nombre completo
                    </label>

                    <input

                        name="nombre"

                        placeholder="Ingrese nombre"

                        value={form.nombre}

                        onChange={cambiar}

                    />

                </div>





                {
                !usuario &&

                <>

                <div className="campo-form">

                    <label>
                        Usuario
                    </label>


                    <input

                        name="usuario"

                        placeholder="Nombre de usuario"

                        value={form.usuario}

                        onChange={cambiar}

                    />

                </div>





                <div className="campo-form">

                    <label>
                        Contraseña
                    </label>


                    <input

                        type="password"

                        name="password"

                        placeholder="Contraseña"

                        value={form.password}

                        onChange={cambiar}

                    />

                </div>


                </>

                }





                <div className="campo-form">

                    <label>
                        Correo
                    </label>


                    <input

                        name="correo"

                        placeholder="correo@empresa.com"

                        value={form.correo}

                        onChange={cambiar}

                    />

                </div>





                <div className="campo-form">

                    <label>
                        Rol
                    </label>


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


                </div>






                <div className="campo-form">

                    <label>
                        Empresa
                    </label>


                    <select

                        name="id_empresa"

                        value={form.id_empresa}

                        onChange={cambiar}

                    >

                        <option value="">
                            Seleccione empresa
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


                </div>







                <div className="campo-form">

                    <label>
                        Sucursal
                    </label>


                    <select

                        name="id_sucursal"

                        value={form.id_sucursal}

                        onChange={cambiar}

                        disabled={!form.id_empresa}

                    >


                        <option value="">
                            Seleccione sucursal
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


                </div>






                <div className="campo-form">

                    <label>
                        Área
                    </label>


                    <select

                        name="id_area"

                        value={form.id_area}

                        onChange={cambiar}

                    >


                        <option value="">
                            Seleccione área
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


                </div>



            </div>






            <div className="acciones-form">


                <button 
                    className="btn-guardar"
                >

                    {
                    usuario
                    ? "Actualizar"
                    : "Guardar"
                    }

                </button>




                <button

                    type="button"

                    className="btn-cancelar"

                    onClick={onCancelar}

                >

                    Cancelar

                </button>



            </div>



        </form>

    );

}