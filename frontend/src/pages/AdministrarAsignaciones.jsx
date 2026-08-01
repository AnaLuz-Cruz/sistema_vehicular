import { useEffect, useState } from "react";

import {
    obtenerAsignaciones,
    obtenerAsignacion,
    actualizarAsignacion,
    cambiarEstadoAsignacion
} from "../services/asignacionesService";

import {
    obtenerUsuarios
} from "../services/usuariosService";

import {
    obtenerUnidades
} from "../services/unidadesService";

import TablaAsignaciones from "../components/asignaciones/TablaAsignaciones";
import FormularioAsignacion from "../components/asignaciones/FormularioAsignacion";

export default function AdministrarAsignaciones() {

    const [asignaciones, setAsignaciones] = useState([]);

    const [usuarios, setUsuarios] = useState([]);

    const [unidades, setUnidades] = useState([]);

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




    const editarAsignacion = async (id) => {

        try {

            const asignacion =
                await obtenerAsignacion(id);

            setAsignacionEditar(asignacion);

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

            alert("Asignación actualizada correctamente.");

            await cargarDatos();

            setAsignacionEditar(null);

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

        status

    ) => {

        const confirmar = window.confirm(

            `¿Desea ${

                status === 1

                    ? "activar"

                    : "desactivar"

            } esta asignación?`

        );

        if (!confirmar) return;

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



    const asignacionesFiltradas =

        asignaciones.filter(a =>

            a.usuario?.toLowerCase().includes(buscar.toLowerCase())

            ||

            a.cve?.toLowerCase().includes(buscar.toLowerCase())

            ||

            a.marca?.toLowerCase().includes(buscar.toLowerCase())

            ||

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

            <hr />

            <TablaAsignaciones

                asignaciones={asignacionesFiltradas}

                onEditar={editarAsignacion}

                onEstado={cambiarEstado}

            />

            {

                asignacionEditar &&

                <FormularioAsignacion

                    asignacion={asignacionEditar}

                    usuarios={usuarios}

                    unidades={unidades}

                    onGuardar={actualizarDatos}

                    onCancelar={() =>

                        setAsignacionEditar(null)

                    }

                />

            }

        </div>

    );

}