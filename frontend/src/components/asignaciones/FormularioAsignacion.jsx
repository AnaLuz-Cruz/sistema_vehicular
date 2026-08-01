import { useEffect, useState } from "react";

import "../../styles/Formularios.css";


export default function FormularioAsignacion({

    asignacion,

    usuarios,

    unidades,

    onGuardar,

    onCancelar

}) {

    const [formulario, setFormulario] = useState({

        id_usuario: "",

        id_unidad: "",

        fecha_asignacion: "",

        fecha_fin: "",

        status: "activo"

    });

    useEffect(() => {

        if (asignacion) {

            setFormulario({

                id_usuario: asignacion.id_usuario || "",

                id_unidad: asignacion.id_unidad || "",

                fecha_asignacion:
                    asignacion.fecha_asignacion
                        ? asignacion.fecha_asignacion.substring(0, 10)
                        : "",

                fecha_fin:
                    asignacion.fecha_fin
                        ? asignacion.fecha_fin.substring(0, 10)
                        : "",

                status:
                    asignacion.status || "activo"

            });

        }

    }, [asignacion]);

    const cambiar = (e) => {

        setFormulario({

            ...formulario,

            [e.target.name]: e.target.value

        });

    };

    const guardar = (e) => {

        e.preventDefault();

        onGuardar(formulario);

    };

    return (

        <form onSubmit={guardar}>

            <h2>

                {asignacion
                    ? "Editar Asignación"
                    : "Nueva Asignación"}

            </h2>

            <div>

                <label>Usuario</label>

                <select

                    name="id_usuario"

                    value={formulario.id_usuario}

                    onChange={cambiar}

                >

                    <option value="">

                        Sin responsable

                    </option>

                    {

                        usuarios.map(usuario => (

                            <option

                                key={usuario.id_usuario}

                                value={usuario.id_usuario}

                            >

                                {usuario.nombre}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div>

                <label>Unidad</label>

                <select

                    required

                    name="id_unidad"

                    value={formulario.id_unidad}

                    onChange={cambiar}

                >

                    <option value="">

                        Seleccione

                    </option>

                    {

                        unidades.map(unidad => (

                            <option

                                key={unidad.id_unidad}

                                value={unidad.id_unidad}

                            >

                                {unidad.cve} - {unidad.marca} {unidad.modelo}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div>

                <label>

                    Fecha asignación

                </label>

                <input

                    required

                    type="date"

                    name="fecha_asignacion"

                    value={formulario.fecha_asignacion}

                    onChange={cambiar}

                />

            </div>

            <div>

                <label>

                    Fecha fin

                </label>

                <input

                    type="date"

                    name="fecha_fin"

                    value={formulario.fecha_fin}

                    onChange={cambiar}

                />

            </div>

            <div>

                <label>Status</label>

                <select

                    name="status"

                    value={formulario.status}

                    onChange={cambiar}

                >

                    <option value="activo">

                        Activo

                    </option>

                    <option value="inactivo">

                        Inactivo

                    </option>

                </select>

            </div>

            <br />

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