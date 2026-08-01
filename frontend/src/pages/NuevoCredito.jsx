import { crearCredito } from "../services/creditosService";

import FormularioCredito from "../components/creditos/FormularioCredito";

export default function NuevoCredito() {

    const guardarCredito = async (datos) => {

        try {

            await crearCredito(datos);

            alert("Crédito creado correctamente.");

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

            <h1>

                Nuevo Crédito

            </h1>

            <FormularioCredito

                onGuardar={guardarCredito}

            />

        </div>

    );

}