import { useEffect, useState } from "react";

import {
    obtenerPrestamos,
    obtenerPrestamo,
    actualizarPrestamo,
    cambiarEstadoPrestamo
} from "../services/prestamosService";

import {
    obtenerUsuarios
} from "../services/usuariosService";

import {
    obtenerUnidades
} from "../services/unidadesService";

import FormularioPrestamo from "../components/prestamos/FormularioPrestamo";
import TablaPrestamos from "../components/prestamos/TablaPrestamos";

export default function AdministrarPrestamos() {

    const [prestamos, setPrestamos] = useState([]);

    const [usuarios, setUsuarios] = useState([]);

    const [unidades, setUnidades] = useState([]);

    const [prestamoEditar, setPrestamoEditar] = useState(null);

    const [buscar, setBuscar] = useState("");



    const cargarDatos = async () => {

        try {

            const [

                prestamosData,

                usuariosData,

                unidadesData

            ] = await Promise.all([

                obtenerPrestamos(),

                obtenerUsuarios(),

                obtenerUnidades()

            ]);

            setPrestamos(prestamosData);

            setUsuarios(usuariosData);

            setUnidades(unidadesData);

        } catch (error) {

            console.error(error);

        }

    };



    useEffect(() => {

        cargarDatos();

    }, []);




    const editarPrestamo = async (id) => {

        try {

            const prestamo =

                await obtenerPrestamo(id);

            setPrestamoEditar(prestamo);

        } catch (error) {

            console.error(error);

        }

    };




    const actualizarDatos = async (datos) => {

        try {

            await actualizarPrestamo(

                prestamoEditar.id_historial,

                datos

            );

            alert("Préstamo actualizado correctamente.");

            await cargarDatos();

            setPrestamoEditar(null);

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Error al actualizar."

            );

        }

    };




    const cambiarEstado = async (

        id,

        estado

    ) => {

        const confirmar = window.confirm(

            `¿Desea ${

                estado === 1

                    ? "activar"

                    : "desactivar"

            } este préstamo?`

        );

        if (!confirmar) return;

        try {

            await cambiarEstadoPrestamo(

                id,

                estado

            );

            await cargarDatos();

        } catch (error) {

            console.error(error);

        }

    };



    const prestamosFiltrados = prestamos.filter(

        (prestamo) =>

            prestamo.usuario

                ?.toLowerCase()

                .includes(buscar.toLowerCase())

            ||

            prestamo.cve

                ?.toLowerCase()

                .includes(buscar.toLowerCase())

            ||

            prestamo.marca

                ?.toLowerCase()

                .includes(buscar.toLowerCase())

            ||

            prestamo.estado

                ?.toLowerCase()

                .includes(buscar.toLowerCase())

    );



    return (

        <div>

            <h1>

                Administrar Préstamos

            </h1>

            <input

                type="text"

                placeholder="Buscar..."

                value={buscar}

                onChange={(e) =>

                    setBuscar(e.target.value)

                }

            />

            <hr />

            <TablaPrestamos

                prestamos={prestamosFiltrados}

                onEditar={editarPrestamo}

                onEstado={cambiarEstado}

            />

            {

                prestamoEditar &&

                <FormularioPrestamo

                    prestamo={prestamoEditar}

                    usuarios={usuarios}

                    unidades={unidades}

                    onGuardar={actualizarDatos}

                    onCancelar={() =>

                        setPrestamoEditar(null)

                    }

                />

            }

        </div>

    );

}