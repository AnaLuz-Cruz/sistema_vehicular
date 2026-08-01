import { useEffect, useState } from "react";

import {
    crearSolicitud
} from "../services/solicitudesService";


import {
    obtenerUsuarios
} from "../services/usuariosService";


import {
    obtenerUnidades
} from "../services/unidadesService";


import {
    obtenerCombustibles
} from "../services/combustiblesService";


import {
    obtenerCreditos
} from "../services/creditosService";


import {
    obtenerTransferencias
} from "../services/transferenciasService";


import FormularioSolicitud from "../components/solicitudes/FormularioSolicitud";


export default function NuevaSolicitud(){


    const [usuarios,setUsuarios]=useState([]);

    const [unidades,setUnidades]=useState([]);

    const [combustibles,setCombustibles]=useState([]);

    const [creditos,setCreditos]=useState([]);

    const [transferencias,setTransferencias]=useState([]);



    const cargarDatos = async()=>{

        try{


            const [

                usuariosData,

                unidadesData,

                combustiblesData,

                creditosData,

                transferenciasData


            ] = await Promise.all([


                obtenerUsuarios(),

                obtenerUnidades(),

                obtenerCombustibles(),

                obtenerCreditos(),

                obtenerTransferencias()


            ]);



            setUsuarios(usuariosData);

            setUnidades(unidadesData);

            setCombustibles(combustiblesData);

            setCreditos(creditosData);

            setTransferencias(transferenciasData);



        }catch(error){

            console.error(error);

        }

    };




    useEffect(()=>{

        cargarDatos();

    },[]);






    const guardarSolicitud = async(datos)=>{


        try{


            await crearSolicitud(datos);


            alert(
                "Solicitud registrada correctamente."
            );



        }catch(error){


            console.error(error);


            alert(

                error.response?.data?.message ||

                "Error al guardar solicitud."

            );

        }


    };




    return(

        <div>


            <h1>
                Nueva Solicitud
            </h1>


            <FormularioSolicitud

                usuarios={usuarios}

                unidades={unidades}

                combustibles={combustibles}

                creditos={creditos}

                transferencias={transferencias}

                onGuardar={guardarSolicitud}

            />


        </div>

    );

}