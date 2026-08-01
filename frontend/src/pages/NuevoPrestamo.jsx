import { useEffect, useState } from "react";

import {
    crearPrestamo
} from "../services/prestamosService";

import {
    obtenerUsuarios
} from "../services/usuariosService";

import {
    obtenerUnidades
} from "../services/unidadesService";

import FormularioPrestamo from "../components/prestamos/FormularioPrestamo";

export default function NuevoPrestamo() {

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

    const guardarPrestamo = async (datos) => {

        try {

            await crearPrestamo(datos);

            alert("Préstamo registrado correctamente.");

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Error al guardar préstamo."

            );

        }

    };

    return (

        <div>

            <h1>

                Nuevo Préstamo

            </h1>

            <FormularioPrestamo

                usuarios={usuarios}

                unidades={unidades}

                onGuardar={guardarPrestamo}

            />

        </div>

    );

}