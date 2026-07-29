import { useEffect, useState } from "react";

import {

    obtenerUnidades,
    obtenerUnidad,
    crearUnidad,
    actualizarUnidad,
    cambiarEstadoUnidad

} from "../services/unidadesService";

import { obtenerEmpresas } from "../services/empresasService";
import { obtenerSucursales } from "../services/sucursalesService";
import { obtenerCombustibles } from "../services/combustiblesService";

import FormularioUnidad from "../components/unidades/FormularioUnidad";
import TablaUnidades from "../components/unidades/TablaUnidades";
import DetalleUnidad from "../components/unidades/DetalleUnidad";

export default function AdministrarUnidades(){

    const [unidades,setUnidades] = useState([]);

    const [empresas,setEmpresas] = useState([]);

    const [sucursales,setSucursales] = useState([]);

    const [combustibles,setCombustibles] = useState([]);

    const [mostrarFormulario,setMostrarFormulario] = useState(false);

    const [unidadEditar,setUnidadEditar] = useState(null);

    const [mostrarDetalle,setMostrarDetalle]=useState(false);

    const [unidadDetalle,setUnidadDetalle]=useState(null);

    const [buscar,setBuscar]=useState("");

    const unidadesFiltradas =

    unidades.filter(u=>

    u.cve?.toLowerCase().includes(buscar.toLowerCase())

    ||

    u.marca?.toLowerCase().includes(buscar.toLowerCase())

    ||

    u.modelo?.toLowerCase().includes(buscar.toLowerCase())

    ||

    u.empresa?.toLowerCase().includes(buscar.toLowerCase())

    );

    const cargarDatos = async()=>{

        try{

            const [

                unidadesData,
                empresasData,
                sucursalesData,
                combustiblesData

            ] = await Promise.all([

                obtenerUnidades(),
                obtenerEmpresas(),
                obtenerSucursales(),
                obtenerCombustibles()

            ]);

            setUnidades(unidadesData);

            setEmpresas(empresasData);

            setSucursales(sucursalesData);

            setCombustibles(combustiblesData);

        }catch(error){

            console.error(error);

        }

    };



    useEffect(()=>{

        cargarDatos();

    },[]);



    const guardarUnidad = async(unidad)=>{

        try{

            await crearUnidad(unidad);

            await cargarDatos();

            setMostrarFormulario(false);

        }catch(error){

            console.error(error);

        }

    };



    const editarUnidad = async(id)=>{

        try{

            const unidad =
                await obtenerUnidad(id);

            setUnidadEditar(unidad);

            setMostrarFormulario(true);

        }catch(error){

            console.error(error);

        }

    };



    const actualizarDatos = async(unidad)=>{

        try{

            await actualizarUnidad(

                unidadEditar.id_unidad,

                unidad

            );

            await cargarDatos();

            setUnidadEditar(null);

            setMostrarFormulario(false);

        }catch(error){

            console.error(error);

        }

    };


    const verUnidad = async (id) => {

        try {

            const unidad = await obtenerUnidad(id);

            console.log(unidad);

            setUnidadDetalle(unidad);

            setMostrarDetalle(true);

        } catch (error) {

            console.error(error);

        }

    }; 



    const cambiarEstado = async(id,estado)=>{

        try{

            await cambiarEstadoUnidad(
                id,
                estado
            );

            await cargarDatos();

        }catch(error){

            console.error(error);

        }

    };

    
    



    return(


        

        <div>

            <h1>

                Administrar Unidades

            </h1>

            <input
                placeholder="Buscar..."
                value={buscar}
                onChange={(e)=>setBuscar(e.target.value)}
            />

            {

                mostrarFormulario ?

                <FormularioUnidad

                    unidad={unidadEditar}

                    empresas={empresas}

                    sucursales={sucursales}

                    combustibles={combustibles}

                    onGuardar={

                        unidadEditar

                        ?

                        actualizarDatos

                        :

                        guardarUnidad

                    }

                    onCancelar={()=>{

                        setUnidadEditar(null);

                        setMostrarFormulario(false);

                    }}

                />

                :

                <button

                    onClick={()=>{

                        setUnidadEditar(null);

                        setMostrarFormulario(true);

                    }}

                >

                    Nueva Unidad

                </button>

            }

            <hr/>

            <TablaUnidades

                unidades={unidadesFiltradas}
            
                onVer={verUnidad}

                onEditar={editarUnidad}

                onEstado={cambiarEstado}

            />

            {

            mostrarDetalle &&

            <DetalleUnidad

                unidad={unidadDetalle}

                onCerrar={()=>{

                    setMostrarDetalle(false);

                    setUnidadDetalle(null);

                }}

            />

            }            

        </div>

    );

}