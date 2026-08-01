import {
    crearTransferencia
} from "../services/transferenciasService";

import FormularioTransferencia from "../components/transferencias/FormularioTransferencia";

export default function NuevaTransferencia() {

    const guardarTransferencia = async (datos) => {

        try {

            await crearTransferencia(datos);

            alert("Transferencia creada correctamente.");

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

                Nueva Transferencia

            </h1>

            <FormularioTransferencia

                onGuardar={guardarTransferencia}

            />

        </div>

    );

}