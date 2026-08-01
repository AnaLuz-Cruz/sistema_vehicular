import { useEffect, useState } from "react";

import {
    obtenerEmpresas,
    obtenerEmpresa,
    actualizarEmpresa,
    cambiarEstadoEmpresa
} from "../services/empresasService";

import TablaEmpresas from "../components/empresas/TablaEmpresas";
import FormularioEmpresa from "../components/empresas/FormularioEmpresa";

export default function AdministrarEmpresas() {

    const [empresas, setEmpresas] = useState([]);

    const [empresaEditar, setEmpresaEditar] =
        useState(null);

    const cargarEmpresas = async () => {

        try {

            const data = await obtenerEmpresas();

            setEmpresas(data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        cargarEmpresas();

    }, []);

    const editarEmpresa = async (id) => {

        try {

            const empresa = await obtenerEmpresa(id);

            setEmpresaEditar(empresa);

        } catch (error) {

            console.error(error);

        }

    };

    const actualizarDatosEmpresa = async (empresa) => {

        try {

            await actualizarEmpresa(
                empresaEditar.id_empresa,
                empresa
            );

            alert("Empresa actualizada correctamente.");

            await cargarEmpresas();

            setEmpresaEditar(null);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "No fue posible actualizar la empresa."
            );

        }

    };

    const cambiarEstado = async (
        id,
        estatus
    ) => {

        const confirmar = window.confirm(

            `¿Está seguro de ${
                estatus === "Activa"
                    ? "activar"
                    : "desactivar"
            } esta empresa?`

        );

        if (!confirmar) return;

        try {

            await cambiarEstadoEmpresa(
                id,
                estatus
            );

            alert("Estado actualizado correctamente.");

            await cargarEmpresas();

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

            <h1>Administrar Empresas</h1>

            {
                empresaEditar && (

                    <FormularioEmpresa

                        empresa={empresaEditar}

                        onGuardar={actualizarDatosEmpresa}

                        onCancelar={() =>

                            setEmpresaEditar(null)

                        }

                    />

                )
            }

            <TablaEmpresas

                empresas={empresas}

                onEditar={editarEmpresa}

                onEstado={cambiarEstado}

            />

        </div>

    );

}