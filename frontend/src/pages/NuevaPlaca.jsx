import { useEffect, useState } from "react";

import {
    crearPlaca
} from "../services/placasService";

import {
    obtenerUnidades
} from "../services/unidadesService";

import FormularioPlaca from "../components/placas/FormularioPlaca";

import {
    useNavigate
} from "react-router-dom";

export default function NuevaPlaca() {

    const navigate = useNavigate();

    const [unidades, setUnidades] = useState([]);

    useEffect(() => {

        cargarUnidades();

    }, []);

    const cargarUnidades = async () => {

        try {

            const data = await obtenerUnidades();

            setUnidades(data);

        } catch (error) {

            console.error(error);

        }

    };

    const guardarPlaca = async (datos) => {

        try {

            await crearPlaca(datos);

            alert("Placa registrada correctamente.");

            navigate("/placas");

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "No fue posible registrar la placa."

            );

        }

    };

    return (

        <div>

            <h1>Nueva Placa</h1>

            <FormularioPlaca

                unidades={unidades}

                onGuardar={guardarPlaca}

                onCancelar={() => navigate("/placas")}

            />

        </div>

    );

}