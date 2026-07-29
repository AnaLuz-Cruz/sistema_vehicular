import { useEffect, useState } from "react";

export default function FormularioCredito({

    credito,

    onGuardar,

    onCancelar

}) {

    const [formulario, setFormulario] = useState({

        nombre_credito: "",

        rfc: "",

        regimen_fiscal: "",

        direccion: "",

        telefono: "",

        inicio_convenio: "",

        vigencia: "",

        limite_credito: "",

        estado: 1

    });

    useEffect(() => {

        if (credito) {

            setFormulario({

                nombre_credito:
                    credito.nombre_credito || "",

                rfc:
                    credito.rfc || "",

                regimen_fiscal:
                    credito.regimen_fiscal || "",

                direccion:
                    credito.direccion || "",

                telefono:
                    credito.telefono || "",

                inicio_convenio:
                    credito.inicio_convenio
                        ? credito.inicio_convenio.substring(0, 10)
                        : "",

                vigencia:
                    credito.vigencia || "",

                limite_credito:
                    credito.limite_credito || "",

                estado:
                    credito.estado ?? 1

            });

        }

    }, [credito]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormulario({

            ...formulario,

            [name]: value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar(formulario);

    };

    return (

        <form onSubmit={handleSubmit}>

            <h3>

                {

                    credito

                        ? "Editar Crédito"

                        : "Nuevo Crédito"

                }

            </h3>

            <input

                type="text"

                name="nombre_credito"

                placeholder="Nombre del crédito"

                value={formulario.nombre_credito}

                onChange={handleChange}

                required

            />

            <input

                type="text"

                name="rfc"

                placeholder="RFC"

                value={formulario.rfc}

                onChange={handleChange}

            />

            <input

                type="text"

                name="regimen_fiscal"

                placeholder="Régimen fiscal"

                value={formulario.regimen_fiscal}

                onChange={handleChange}

            />

            <input

                type="text"

                name="direccion"

                placeholder="Dirección"

                value={formulario.direccion}

                onChange={handleChange}

            />

            <input

                type="text"

                name="telefono"

                placeholder="Teléfono"

                value={formulario.telefono}

                onChange={handleChange}

            />

            <input

                type="date"

                name="inicio_convenio"

                value={formulario.inicio_convenio}

                onChange={handleChange}

            />

            <input

                type="text"

                name="vigencia"

                placeholder="Vigencia"

                value={formulario.vigencia}

                onChange={handleChange}

            />

            <input

                type="number"

                step="0.01"

                min="0"

                name="limite_credito"

                placeholder="Límite de crédito"

                value={formulario.limite_credito}

                onChange={handleChange}

            />

            <div>

                <button type="submit">

                    Guardar

                </button>

                <button

                    type="button"

                    onClick={onCancelar}

                >

                    Cancelar

                </button>

            </div>

        </form>

    );

}