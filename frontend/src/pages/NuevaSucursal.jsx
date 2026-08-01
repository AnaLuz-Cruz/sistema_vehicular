import { useEffect, useState } from "react";

import {
    crearSucursal
} from "../services/sucursalesService";

import {
    obtenerEmpresas
} from "../services/empresasService";

import FormularioSucursal from "../components/sucursales/FormularioSucursal";

import {
    useNavigate
} from "react-router-dom";

export default function NuevaSucursal() {

    const navigate = useNavigate();

    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {

        cargarEmpresas();

    }, []);

    const cargarEmpresas = async () => {

        try {

            const data = await obtenerEmpresas();

            setEmpresas(data);

        } catch (error) {

            console.error(error);

        }

    };

    const guardarSucursal = async (sucursal) => {

        try {

            await crearSucursal(sucursal);

            alert("Sucursal creada correctamente.");

            navigate("/sucursales");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "No fue posible crear la sucursal."
            );

        }

    };

    return (

        <div>

            <h1>Nueva Sucursal</h1>

            <FormularioSucursal

                empresas={empresas}

                onGuardar={guardarSucursal}

                onCancelar={() => navigate("/sucursales")}

            />

        </div>

    );

}