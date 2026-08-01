import { useEffect, useState } from "react";

import FormularioUsuario from "../components/usuarios/FormularioUsuario";

import {
    crearUsuario
} from "../services/usuariosService";

import {
    obtenerEmpresas
} from "../services/empresasService";

import {
    obtenerSucursales
} from "../services/sucursalesService";

import {
    obtenerAreas
} from "../services/areasService";



export default function NuevoUsuario() {

    const [empresas, setEmpresas] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {

        cargarCatalogos();

    }, []);

    const cargarCatalogos = async () => {

        const [

            empresasData,
            sucursalesData,
            areasData

        ] = await Promise.all([

            obtenerEmpresas(),
            obtenerSucursales(),
            obtenerAreas()

        ]);

        setEmpresas(empresasData);
        setSucursales(sucursalesData);
        setAreas(areasData);

    };

    const guardar = async (usuario) => {

        await crearUsuario(usuario);

        alert("Usuario creado correctamente.");

    };

    return (

        <div>

            <h1>Nuevo Usuario</h1>

            <FormularioUsuario

                empresas={empresas}
                sucursales={sucursales}
                areas={areas}
                onGuardar={guardar}

            />

        </div>

    );

}