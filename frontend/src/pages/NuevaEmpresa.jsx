import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { crearEmpresa } from "../services/empresasService";

import FormularioEmpresa from "../components/empresas/FormularioEmpresa";

export default function NuevaEmpresa() {

    const navigate = useNavigate();

    const [guardando, setGuardando] = useState(false);

    const guardarEmpresa = async (empresa) => {

        try {

            setGuardando(true);

            await crearEmpresa(empresa);

            alert("Empresa creada correctamente.");

            navigate("/empresas");

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "No fue posible crear la empresa."

            );

        } finally {

            setGuardando(false);

        }

    };

    return (

        <div>

            <h1>Nueva Empresa</h1>

            <FormularioEmpresa

                empresa={null}

                onGuardar={guardarEmpresa}

                onCancelar={() => navigate("/empresas")}

                guardando={guardando}

            />

        </div>

    );

}