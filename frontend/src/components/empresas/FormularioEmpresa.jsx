import {
    useEffect,
    useState
} from "react";

export default function FormularioEmpresa({

    empresa,

    onGuardar,

    onCancelar

}) {

    const [form, setForm] = useState({

        razon_social: "",
        rfc: "",
        regimen_fiscal: "",
        nombre_comercial: "",
        direccion: "",
        inicio_operaciones: "",
        actividad_economica: ""

    });



    useEffect(() => {

        if (empresa) {

            setForm({

                razon_social: empresa.razon_social || "",
                rfc: empresa.rfc || "",
                regimen_fiscal: empresa.regimen_fiscal || "",
                nombre_comercial: empresa.nombre_comercial || "",
                direccion: empresa.direccion || "",
                inicio_operaciones: empresa.inicio_operaciones
                    ? empresa.inicio_operaciones.substring(0, 10)
                    : "",
                actividad_economica:
                    empresa.actividad_economica || ""

            });

        }

    }, [empresa]);



    const cambiar = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



    const enviar = (e) => {

        e.preventDefault();

        onGuardar(form);

    };



    return (

        <form onSubmit={enviar}>

            <h2>

                {
                    empresa
                        ? "Editar Empresa"
                        : "Nueva Empresa"
                }

            </h2>



            <input

                name="razon_social"

                placeholder="Razón Social"

                value={form.razon_social}

                onChange={cambiar}

            />



            <input

                name="rfc"

                placeholder="RFC"

                value={form.rfc}

                onChange={cambiar}

            />



            <input

                name="regimen_fiscal"

                placeholder="Régimen Fiscal"

                value={form.regimen_fiscal}

                onChange={cambiar}

            />



            <input

                name="nombre_comercial"

                placeholder="Nombre Comercial"

                value={form.nombre_comercial}

                onChange={cambiar}

            />



            <input

                name="direccion"

                placeholder="Dirección"

                value={form.direccion}

                onChange={cambiar}

            />



            <input

                type="date"

                name="inicio_operaciones"

                value={form.inicio_operaciones}

                onChange={cambiar}

            />



            <input

                name="actividad_economica"

                placeholder="Actividad Económica"

                value={form.actividad_economica}

                onChange={cambiar}

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