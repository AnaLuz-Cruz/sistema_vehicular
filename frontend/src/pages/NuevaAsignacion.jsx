import { useEffect, useState } from "react";

import {
    crearAsignacion
} from "../services/asignacionesService";

import {
    obtenerUsuarios
} from "../services/usuariosService";

import {
    obtenerUnidades
} from "../services/unidadesService";

import FormularioAsignacion from "../components/asignaciones/FormularioAsignacion";

export default function NuevaAsignacion() {

    const [usuarios, setUsuarios] = useState([]);
    const [unidades, setUnidades] = useState([]);

    const cargarDatos = async () => {

        try {

            const [

                usuariosData,
                unidadesData

            ] = await Promise.all([

                obtenerUsuarios(),
                obtenerUnidades()

            ]);

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

            alert("Asignación creada correctamente.");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Error al guardar."
            );

        }

    };

    return (

        <div>

            <h1>Nueva Asignación</h1>

            <FormularioAsignacion

                usuarios={usuarios}

                unidades={unidades}

                onGuardar={guardarAsignacion}

            />

        </div>

    );

}