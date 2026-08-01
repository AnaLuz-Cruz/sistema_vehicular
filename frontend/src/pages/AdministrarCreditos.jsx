import { useEffect, useState } from "react";

import {
    obtenerCreditos,
    obtenerCredito,
    actualizarCredito,
    cambiarEstadoCredito
} from "../services/creditosService";

import FormularioCredito from "../components/creditos/FormularioCredito";
import TablaCreditos from "../components/creditos/TablaCreditos";

export default function AdministrarCreditos() {

    const [creditos, setCreditos] = useState([]);

    const [creditoEditar, setCreditoEditar] = useState(null);

    const [buscar, setBuscar] = useState("");



    const cargarDatos = async () => {

        try {

            const data = await obtenerCreditos();

            setCreditos(data);

        } catch (error) {

            console.error(error);

        }

    };



    useEffect(() => {

        cargarDatos();

    }, []);




    const editarCredito = async (id) => {

        try {

            const credito = await obtenerCredito(id);

            setCreditoEditar(credito);

        } catch (error) {

            console.error(error);

        }

    };




    const actualizarDatos = async (datos) => {

        try {

            await actualizarCredito(

                creditoEditar.id_credito,

                datos

            );

            alert("Crédito actualizado correctamente.");

            await cargarDatos();

            setCreditoEditar(null);

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Error al actualizar."

            );

        }

    };




    const cambiarEstado = async (

        id,

        estado

    ) => {

        const confirmar = window.confirm(

            `¿Desea ${

                estado === 1

                    ? "activar"

                    : "desactivar"

            } este crédito?`

        );

        if (!confirmar) return;

        try {

            await cambiarEstadoCredito(

                id,

                estado

            );

            await cargarDatos();

        } catch (error) {

            console.error(error);

        }

    };




    const creditosFiltrados = creditos.filter(

        (credito) =>

            credito.nombre_credito
                ?.toLowerCase()
                .includes(buscar.toLowerCase())

            ||

            credito.rfc
                ?.toLowerCase()
                .includes(buscar.toLowerCase())

            ||

            credito.telefono
                ?.toLowerCase()
                .includes(buscar.toLowerCase())

    );



    return (

        <div>

            <h1>

                Administrar Créditos

            </h1>

            <input

                type="text"

                placeholder="Buscar..."

                value={buscar}

                onChange={(e) =>

                    setBuscar(e.target.value)

                }

            />

            <hr />

            <TablaCreditos

                creditos={creditosFiltrados}

                onEditar={editarCredito}

                onEstado={cambiarEstado}

            />

            {

                creditoEditar &&

                <FormularioCredito

                    credito={creditoEditar}

                    onGuardar={actualizarDatos}

                    onCancelar={() =>

                        setCreditoEditar(null)

                    }

                />

            }

        </div>

    );

}