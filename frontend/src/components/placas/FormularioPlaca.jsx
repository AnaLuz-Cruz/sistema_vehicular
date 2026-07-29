import { useEffect, useState } from "react";

export default function FormularioPlaca({

    placa,

    unidades,

    onGuardar,

    onCancelar

}) {

    const [formulario, setFormulario] = useState({

        folio: "",

        placa: "",

        fecha_expedicion: "",

        fecha_vigencia: "",

        url_placa_frontal: "",

        url_placa_trasera: "",

        requiere_renovacion: 0,

        status: "activa",

        monto_pago: "",

        url_comprobante_pago: "",

        url_tarjeta_circulacion: "",

        id_unidad: ""

    });

    useEffect(() => {

        if (placa) {

            setFormulario({

                folio: placa.folio || "",

                placa: placa.placa || "",

                fecha_expedicion: placa.fecha_expedicion
                    ? placa.fecha_expedicion.substring(0, 10)
                    : "",

                fecha_vigencia: placa.fecha_vigencia
                    ? placa.fecha_vigencia.substring(0, 10)
                    : "",

                url_placa_frontal:
                    placa.url_placa_frontal || "",

                url_placa_trasera:
                    placa.url_placa_trasera || "",

                requiere_renovacion:
                    Number(placa.requiere_renovacion),

                status:
                    placa.status || "activa",

                monto_pago:
                    placa.monto_pago || "",

                url_comprobante_pago:
                    placa.url_comprobante_pago || "",

                url_tarjeta_circulacion:
                    placa.url_tarjeta_circulacion || "",

                id_unidad:
                    placa.id_unidad || ""

            });

        }

    }, [placa]);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormulario({

            ...formulario,

            [name]:

                type === "checkbox"

                    ? checked ? 1 : 0

                    : value

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

                    placa

                        ? "Editar placa"

                        : "Nueva placa"

                }

            </h3>

            <input

                type="text"

                name="folio"

                placeholder="Folio"

                value={formulario.folio}

                onChange={handleChange}

            />

            <input

                type="text"

                name="placa"

                placeholder="Número de placa"

                value={formulario.placa}

                onChange={handleChange}

                required

            />

            <input

                type="date"

                name="fecha_expedicion"

                value={formulario.fecha_expedicion}

                onChange={handleChange}

            />

            <input

                type="date"

                name="fecha_vigencia"

                value={formulario.fecha_vigencia}

                onChange={handleChange}

            />

            <input

                type="number"

                step="0.01"

                name="monto_pago"

                placeholder="Monto"

                value={formulario.monto_pago}

                onChange={handleChange}

                required

            />

            <select

                name="status"

                value={formulario.status}

                onChange={handleChange}

            >

                <option value="activa">

                    Activa

                </option>

                <option value="vencida">

                    Vencida

                </option>

                <option value="cancelada">

                    Cancelada

                </option>

            </select>

            <select

                name="id_unidad"

                value={formulario.id_unidad}

                onChange={handleChange}

            >

                <option value="">

                    Seleccione una unidad

                </option>

                {

                    unidades.map((unidad) => (

                        <option

                            key={unidad.id_unidad}

                            value={unidad.id_unidad}

                        >

                            {unidad.cve} - {unidad.marca} {unidad.modelo}

                        </option>

                    ))

                }

            </select>

            <label>

                <input

                    type="checkbox"

                    name="requiere_renovacion"

                    checked={

                        formulario.requiere_renovacion === 1

                    }

                    onChange={handleChange}

                />

                Requiere renovación

            </label>

            <input

                type="text"

                name="url_placa_frontal"

                placeholder="URL placa frontal"

                value={formulario.url_placa_frontal}

                onChange={handleChange}

            />

            <input

                type="text"

                name="url_placa_trasera"

                placeholder="URL placa trasera"

                value={formulario.url_placa_trasera}

                onChange={handleChange}

            />

            <input

                type="text"

                name="url_comprobante_pago"

                placeholder="URL comprobante"

                value={formulario.url_comprobante_pago}

                onChange={handleChange}

            />

            <input

                type="text"

                name="url_tarjeta_circulacion"

                placeholder="URL tarjeta"

                value={formulario.url_tarjeta_circulacion}

                onChange={handleChange}

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