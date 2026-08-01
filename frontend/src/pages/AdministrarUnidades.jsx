import { useEffect, useState } from "react";

import {

    obtenerUnidades,
    obtenerUnidad,
    actualizarUnidad,
    cambiarEstadoUnidad

} from "../services/unidadesService";

import {

    obtenerEmpresas

} from "../services/empresasService";

import {

    obtenerSucursales

} from "../services/sucursalesService";

import {

    obtenerCombustibles

} from "../services/combustiblesService";

import FormularioUnidad from "../components/unidades/FormularioUnidad";

import TablaUnidades from "../components/unidades/TablaUnidades";

import DetalleUnidad from "../components/unidades/DetalleUnidad";

export default function AdministrarUnidades() {

    const [unidades, setUnidades] = useState([]);

    const [empresas, setEmpresas] = useState([]);

    const [sucursales, setSucursales] = useState([]);

    const [combustibles, setCombustibles] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [unidadEditar, setUnidadEditar] = useState(null);

    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    const [unidadDetalle, setUnidadDetalle] = useState(null);

    const [buscar, setBuscar] = useState("");

    const unidadesFiltradas = unidades.filter((u) =>

        u.cve?.toLowerCase().includes(buscar.toLowerCase()) ||

        u.marca?.toLowerCase().includes(buscar.toLowerCase()) ||

        u.modelo?.toLowerCase().includes(buscar.toLowerCase()) ||

        u.empresa?.toLowerCase().includes(buscar.toLowerCase())

    );

    const cargarDatos = async () => {

        try {

            const [

                unidadesData,
                empresasData,
                sucursalesData,
                combustiblesData

            ] = await Promise.all([

                obtenerUnidades(),
                obtenerEmpresas(),
                obtenerSucursales(),
                obtenerCombustibles()

            ]);

            setUnidades(unidadesData);

            setEmpresas(empresasData);

            setSucursales(sucursalesData);

            setCombustibles(combustiblesData);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        cargarDatos();

    }, []);

    const editarUnidad = async (id) => {

        try {

            const unidad = await obtenerUnidad(id);

            setUnidadEditar(unidad);

            setMostrarFormulario(true);

        } catch (error) {

            console.error(error);

        }

    };

    const actualizarDatos = async (unidad) => {

        try {

            await actualizarUnidad(

                unidadEditar.id_unidad,

                unidad

            );

            alert("Unidad actualizada correctamente.");

            await cargarDatos();

            setUnidadEditar(null);

            setMostrarFormulario(false);

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "No fue posible actualizar la unidad."

            );

        }

    };

    const verUnidad = async (id) => {

        try {

            const unidad = await obtenerUnidad(id);

            setUnidadDetalle(unidad);

            setMostrarDetalle(true);

        } catch (error) {

            console.error(error);

        }

    };

    const cambiarEstado = async (id, estado) => {

        const confirmar = window.confirm(

            `¿Está seguro de ${estado === 1 ? "activar" : "desactivar"} esta unidad?`

        );

        if (!confirmar) return;

        try {

            await cambiarEstadoUnidad(id, estado);

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

    return (

        <div>

            <h1>Administrar Unidades</h1>

            <input

                type="text"

                placeholder="Buscar unidad..."

                value={buscar}

                onChange={(e) => setBuscar(e.target.value)}

            />

            {

                mostrarFormulario && (

                    <FormularioUnidad

                        unidad={unidadEditar}

                        empresas={empresas}

                        sucursales={sucursales}

                        combustibles={combustibles}

                        onGuardar={actualizarDatos}

                        onCancelar={() => {

                            setUnidadEditar(null);

                            setMostrarFormulario(false);

                        }}

                    />

                )

            }

            <TablaUnidades

                unidades={unidadesFiltradas}

                onVer={verUnidad}

                onEditar={editarUnidad}

                onEstado={cambiarEstado}

            />

            {

                mostrarDetalle && (

                    <DetalleUnidad

                        unidad={unidadDetalle}

                        onCerrar={() => {

                            setMostrarDetalle(false);

                            setUnidadDetalle(null);

                        }}

                    />

                )

            }

        </div>

    );

}