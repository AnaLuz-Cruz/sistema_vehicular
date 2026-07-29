import { useEffect, useState } from "react";

import {

    obtenerAreas,
    obtenerArea,
    crearArea,
    actualizarArea,
    eliminarArea

} from "../services/areasService";

import TablaAreas from "../components/areas/TablaAreas";
import FormularioArea from "../components/areas/FormularioArea";

export default function AdministrarAreas(){

    const [areas,setAreas] = useState([]);

    const [mostrarFormulario,setMostrarFormulario] = useState(false);

    const [areaEditar,setAreaEditar] = useState(null);



    const cargarAreas = async()=>{

        try{

            const data = await obtenerAreas();

            setAreas(data);

        }catch(error){

            console.error(error);

        }

    };



    useEffect(()=>{

        cargarAreas();

    },[]);



    const guardarArea = async(area)=>{

        try{

            await crearArea(area);

            await cargarAreas();

            setMostrarFormulario(false);

        }catch(error){

            console.error(error);

        }

    };



    const editarArea = async(id)=>{

        try{

            const area = await obtenerArea(id);

            setAreaEditar(area);

            setMostrarFormulario(true);

        }catch(error){

            console.error(error);

        }

    };



    const actualizarDatos = async(area)=>{

        try{

            await actualizarArea(

                areaEditar.id_area,

                area

            );

            await cargarAreas();

            setAreaEditar(null);

            setMostrarFormulario(false);

        }catch(error){

            console.error(error);

        }

    };



    const eliminar = async(id)=>{

        if(!confirm("¿Eliminar esta área?")) return;

        try{

            await eliminarArea(id);

            cargarAreas();

        }catch(error){

            console.error(error);

        }

    };



    return(

        <div>

            <h1>Administrar Áreas</h1>

            {

                mostrarFormulario ?

                <FormularioArea

                    area={areaEditar}

                    onGuardar={
                        areaEditar
                        ? actualizarDatos
                        : guardarArea
                    }

                    onCancelar={()=>{

                        setAreaEditar(null);

                        setMostrarFormulario(false);

                    }}

                />

                :

                <button onClick={()=>{

                    setAreaEditar(null);

                    setMostrarFormulario(true);

                }}>

                    Nueva Área

                </button>

            }

            <hr/>

            <TablaAreas

                areas={areas}

                onEditar={editarArea}

                onEliminar={eliminar}

            />

        </div>

    );

}