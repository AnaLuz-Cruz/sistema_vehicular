import { useEffect, useState } from "react";

import {
    obtenerAsignaciones,
    obtenerAsignacion,
    crearAsignacion,
    actualizarAsignacion,
    cambiarEstadoAsignacion
} from "../services/asignacionesService";

import { obtenerUsuarios } from "../services/usuariosService";
import { obtenerUnidades } from "../services/unidadesService";

import FormularioAsignacion from "../components/asignaciones/FormularioAsignacion";
import TablaAsignaciones from "../components/asignaciones/TablaAsignaciones";

export default function AdministrarAsignaciones() {

    const [asignaciones, setAsignaciones] = useState([]);

    const [usuarios, setUsuarios] = useState([]);

    const [unidades, setUnidades] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [asignacionEditar, setAsignacionEditar] = useState(null);

    const [buscar, setBuscar] = useState("");

    const cargarDatos = async () => {

        try {

            const [

                asignacionesData,
                usuariosData,
                unidadesData

            ] = await Promise.all([

                obtenerAsignaciones(),
                obtenerUsuarios(),
                obtenerUnidades()

            ]);

            setAsignaciones(asignacionesData);

            setUsuarios(usuariosData);

            setUnidades(unidadesData);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        cargarDatos();

    }, []);

    const guardarAsignacion = async (datos) => {

        try {

            await crearAsignacion(datos);

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

    const editarAsignacion = async (id) => {

        try {

            const asignacion = await obtenerAsignacion(id);

            setAsignacionEditar(asignacion);

            setMostrarFormulario(true);

        } catch (error) {

            console.error(error);

        }

    };

    const actualizarDatos = async (datos) => {

        try {

            await actualizarAsignacion(

                asignacionEditar.id_asignacion,

                datos

            );

            await cargarDatos();

            setAsignacionEditar(null);

            setMostrarFormulario(false);

        } catch (error) {

            console.error(error);

        }

    };

    const cambiarEstado = async (id, status) => {

        try {

            await cambiarEstadoAsignacion(
                id,
                status
            );

            await cargarDatos();

        } catch (error) {

            console.error(error);

        }

    };

    const asignacionesFiltradas = asignaciones.filter(a =>

        a.usuario?.toLowerCase().includes(buscar.toLowerCase()) ||

        a.cve?.toLowerCase().includes(buscar.toLowerCase()) ||

        a.marca?.toLowerCase().includes(buscar.toLowerCase()) ||

        a.sucursal?.toLowerCase().includes(buscar.toLowerCase())

    );

    return (

        <div>

            <h1>

                Administrar Asignaciones

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

                    <FormularioAsignacion

                        asignacion={asignacionEditar}

                        usuarios={usuarios}

                        unidades={unidades}

                        onGuardar={

                            asignacionEditar

                                ?

                                actualizarDatos

                                :

                                guardarAsignacion

                        }

                        onCancelar={() => {

                            setMostrarFormulario(false);

                            setAsignacionEditar(null);

                        }}

                    />

                    :

                    <button

                        onClick={() => {

                            setAsignacionEditar(null);

                            setMostrarFormulario(true);

                        }}

                    >

                        Nueva Asignación

                    </button>

            }

            <hr />

            <TablaAsignaciones

                asignaciones={asignacionesFiltradas}

                onEditar={editarAsignacion}

                onEstado={cambiarEstado}

            />

        </div>

    );

}