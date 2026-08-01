import {
    useEffect,
    useState
} from "react";

import {

    obtenerSucursales,
    obtenerSucursal,
    actualizarSucursal,
    cambiarEstadoSucursal

} from "../services/sucursalesService";

import {

    obtenerEmpresas

} from "../services/empresasService";

import TablaSucursales
from "../components/sucursales/TablaSucursales";

import FormularioSucursal
from "../components/sucursales/FormularioSucursal";

export default function AdministrarSucursales() {

    const [sucursales, setSucursales] = useState([]);

    const [empresas, setEmpresas] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [sucursalEditar, setSucursalEditar] = useState(null);

    const cargarDatos = async () => {

        try {

            const [

                sucursalesData,
                empresasData

            ] = await Promise.all([

                obtenerSucursales(),
                obtenerEmpresas()

            ]);

            setSucursales(sucursalesData);

            setEmpresas(empresasData);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        cargarDatos();

    }, []);

    const editarSucursal = async (id) => {

        try {

            const sucursal = await obtenerSucursal(id);

            setSucursalEditar(sucursal);

            setMostrarFormulario(true);

        } catch (error) {

            console.error(error);

        }

    };

    const actualizarDatosSucursal = async (sucursal) => {

        try {

            await actualizarSucursal(

                sucursalEditar.id_sucursal,

                sucursal

            );

            alert("Sucursal actualizada correctamente.");

            await cargarDatos();

            setSucursalEditar(null);

            setMostrarFormulario(false);

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "No fue posible actualizar la sucursal."

            );

        }

    };

    const cambiarEstado = async (id, estado) => {

        try {

            const confirmar = window.confirm(

                `¿Está seguro de ${estado === 1 ? "activar" : "desactivar"} esta sucursal?`

            );

            if (!confirmar) return;

            await cambiarEstadoSucursal(id, estado);

            alert("Estado actualizado correctamente.");

            await cargarDatos();

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

            <h1>Administrar Sucursales</h1>

            {

                mostrarFormulario && (

                    <FormularioSucursal

                        sucursal={sucursalEditar}

                        empresas={empresas}

                        onGuardar={actualizarDatosSucursal}

                        onCancelar={() => {

                            setSucursalEditar(null);

                            setMostrarFormulario(false);

                        }}

                    />

                )

            }

            <TablaSucursales

                sucursales={sucursales}

                onEditar={editarSucursal}

                onEstado={cambiarEstado}

            />

        </div>

    );

}