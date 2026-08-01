import { useEffect, useState } from "react";

import {
    crearUnidad
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

import {
    useNavigate
} from "react-router-dom";

export default function NuevaUnidad() {

    const navigate = useNavigate();

    const [empresas, setEmpresas] = useState([]);

    const [sucursales, setSucursales] = useState([]);

    const [combustibles, setCombustibles] = useState([]);

    useEffect(() => {

        cargarDatos();

    }, []);

    const cargarDatos = async () => {

        try {

            const [

                empresasData,
                sucursalesData,
                combustiblesData

            ] = await Promise.all([

                obtenerEmpresas(),
                obtenerSucursales(),
                obtenerCombustibles()

            ]);

            setEmpresas(empresasData);

            setSucursales(sucursalesData);

            setCombustibles(combustiblesData);

        } catch (error) {

            console.error(error);

        }

    };

    const guardarUnidad = async (unidad) => {

        try {

            await crearUnidad(unidad);

            alert("Unidad creada correctamente.");

            navigate("/unidades");

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "No fue posible crear la unidad."

            );

        }

    };

    return (

        <div>

            <h1>Nueva Unidad</h1>

            <FormularioUnidad

                empresas={empresas}

                sucursales={sucursales}

                combustibles={combustibles}

                onGuardar={guardarUnidad}

                onCancelar={() => navigate("/unidades")}

            />

        </div>

    );

}