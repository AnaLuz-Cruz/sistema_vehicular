import { useEffect, useState } from "react";

import {

    obtenerPlacas,
    obtenerPlaca,
    actualizarPlaca,
    cambiarEstadoPlaca

} from "../services/placasService";

import {

    obtenerUnidades

} from "../services/unidadesService";

import FormularioPlaca from "../components/placas/FormularioPlaca";

import TablaPlacas from "../components/placas/TablaPlacas";

export default function AdministrarPlacas() {

    const [placas, setPlacas] = useState([]);

    const [unidades, setUnidades] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [placaEditar, setPlacaEditar] = useState(null);

    const [buscar, setBuscar] = useState("");

    const cargarDatos = async () => {

        try {

            const [

                placasData,
                unidadesData

            ] = await Promise.all([

                obtenerPlacas(),
                obtenerUnidades()

            ]);

            setPlacas(placasData);

            setUnidades(unidadesData);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        cargarDatos();

    }, []);

    const editarPlaca = async (id) => {

        try {

            const placa = await obtenerPlaca(id);

            setPlacaEditar(placa);

            setMostrarFormulario(true);

        } catch (error) {

            console.error(error);

        }

    };

    const actualizarDatos = async (datos) => {

        try {

            await actualizarPlaca(

                placaEditar.id_placa,

                datos

            );

            alert("Placa actualizada correctamente.");

            await cargarDatos();

            setMostrarFormulario(false);

            setPlacaEditar(null);

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "No fue posible actualizar la placa."

            );

        }

    };

    const cambiarEstado = async (id, estado) => {

        const confirmar = window.confirm(

            `¿Está seguro de ${estado === 1 ? "activar" : "desactivar"} esta placa?`

        );

        if (!confirmar) return;

        try {

            await cambiarEstadoPlaca(

                id,

                estado

            );

            alert("Estado actualizado correctamente.");

            await cargarDatos();

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "No fue posible actualizar el estado."

            );

        }

    };

    const placasFiltradas = placas.filter((p) =>

        p.placa?.toLowerCase().includes(buscar.toLowerCase()) ||

        p.folio?.toLowerCase().includes(buscar.toLowerCase()) ||

        p.cve?.toLowerCase().includes(buscar.toLowerCase()) ||

        p.marca?.toLowerCase().includes(buscar.toLowerCase()) ||

        p.modelo?.toLowerCase().includes(buscar.toLowerCase())

    );

    return (

        <div>

            <h1>Administrar Placas</h1>

            <input

                type="text"

                placeholder="Buscar placa..."

                value={buscar}

                onChange={(e) => setBuscar(e.target.value)}

            />

            {

                mostrarFormulario && (

                    <FormularioPlaca

                        placa={placaEditar}

                        unidades={unidades}

                        onGuardar={actualizarDatos}

                        onCancelar={() => {

                            setMostrarFormulario(false);

                            setPlacaEditar(null);

                        }}

                    />

                )

            }

            <TablaPlacas

                placas={placasFiltradas}

                onEditar={editarPlaca}

                onEstado={cambiarEstado}

            />

        </div>

    );

}