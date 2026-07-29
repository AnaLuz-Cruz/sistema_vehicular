import { useEffect, useState } from "react";

import {
    obtenerEmpresas,
    obtenerEmpresa,
    crearEmpresa,
    actualizarEmpresa,
    cambiarEstadoEmpresa
} from "../services/empresasService";

import TablaEmpresas from "../components/empresas/TablaEmpresas";
import FormularioEmpresa from "../components/empresas/FormularioEmpresa";

export default function AdministrarEmpresas() {

    const [empresas, setEmpresas] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] =
        useState(false);

    const [empresaEditar, setEmpresaEditar] =
        useState(null);



    const cargarEmpresas = async () => {

        try {

            const data =
                await obtenerEmpresas();

            setEmpresas(data);

        } catch (error) {

            console.error(error);

        }

    };



    useEffect(() => {

        cargarEmpresas();

    }, []);




    const guardarEmpresa = async (empresa) => {

        try {

            await crearEmpresa(empresa);

            await cargarEmpresas();

            setMostrarFormulario(false);

        } catch (error) {

            console.error(error);

        }

    };




    const editarEmpresa = async (id) => {

        try {

            const empresa =
                await obtenerEmpresa(id);

            setEmpresaEditar(empresa);

            setMostrarFormulario(true);

        } catch (error) {

            console.error(error);

        }

    };




    const actualizarDatosEmpresa = async (
        empresa
    ) => {

        try {

            await actualizarEmpresa(
                empresaEditar.id_empresa,
                empresa
            );

            await cargarEmpresas();

            setEmpresaEditar(null);

            setMostrarFormulario(false);

        } catch (error) {

            console.error(error);

        }

    };




    const cambiarEstado = async (
        id,
        estatus
    ) => {

        try {

            const confirmar = window.confirm(

                `¿Desea ${
                    estatus === "Activa"
                        ? "activar"
                        : "desactivar"
                } esta empresa?`

            );

            if (!confirmar) return;

            await cambiarEstadoEmpresa(
                id,
                estatus
            );

            await cargarEmpresas();

        } catch (error) {

            console.error(error);

        }

    };



    return (

        <div>

            <h1>
                Administrar Empresas
            </h1>

            {

                mostrarFormulario ?

                    <FormularioEmpresa

                        empresa={empresaEditar}

                        onGuardar={
                            empresaEditar
                                ? actualizarDatosEmpresa
                                : guardarEmpresa
                        }

                        onCancelar={() => {

                            setEmpresaEditar(null);

                            setMostrarFormulario(false);

                        }}

                    />

                    :

                    <button

                        onClick={() =>
                            setMostrarFormulario(true)
                        }

                    >

                        Nueva Empresa

                    </button>

            }

            <hr />

            <TablaEmpresas

                empresas={empresas}

                onEditar={editarEmpresa}

                onEstado={cambiarEstado}

            />

        </div>

    );

}