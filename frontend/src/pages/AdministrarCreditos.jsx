import { useEffect, useState } from "react";

import {
    obtenerCreditos,
    obtenerCredito,
    crearCredito,
    actualizarCredito,
    cambiarEstadoCredito
} from "../services/creditosService";

import FormularioCredito from "../components/creditos/FormularioCredito";
import TablaCreditos from "../components/creditos/TablaCreditos";

export default function AdministrarCreditos() {

    const [creditos, setCreditos] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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

    const guardarCredito = async (datos) => {

        try {

            await crearCredito(datos);

            await cargarDatos();

            setMostrarFormulario(false);

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Error al guardar."

            );

        }

    };

    const editarCredito = async (id) => {

        try {

            const credito = await obtenerCredito(id);

            setCreditoEditar(credito);

            setMostrarFormulario(true);

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

            await cargarDatos();

            setCreditoEditar(null);

            setMostrarFormulario(false);

        } catch (error) {

            console.error(error);

        }

    };

    const cambiarEstado = async (id, estado) => {

        try {

            await cambiarEstadoCredito(id, estado);

            await cargarDatos();

        } catch (error) {

            console.error(error);

        }

    };

    const creditosFiltrados = creditos.filter((credito) =>

        credito.nombre_credito?.toLowerCase().includes(buscar.toLowerCase()) ||

        credito.rfc?.toLowerCase().includes(buscar.toLowerCase()) ||

        credito.telefono?.toLowerCase().includes(buscar.toLowerCase())

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

            {

                mostrarFormulario

                    ?

                    <FormularioCredito

                        credito={creditoEditar}

                        onGuardar={

                            creditoEditar

                                ?

                                actualizarDatos

                                :

                                guardarCredito

                        }

                        onCancelar={() => {

                            setMostrarFormulario(false);

                            setCreditoEditar(null);

                        }}

                    />

                    :

                    <button

                        onClick={() => {

                            setCreditoEditar(null);

                            setMostrarFormulario(true);

                        }}

                    >

                        Nuevo Crédito

                    </button>

            }

            <hr />

            <TablaCreditos

                creditos={creditosFiltrados}

                onEditar={editarCredito}

                onEstado={cambiarEstado}

            />

        </div>

    );

}