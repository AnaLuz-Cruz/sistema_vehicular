import { useEffect, useState } from "react";


import {

    obtenerSolicitudes,

    obtenerSolicitud,

    crearSolicitud,

    cambiarEstadoSolicitud

} from "../services/solicitudesService";



import { obtenerUsuarios } from "../services/usuariosService";

import { obtenerUnidades } from "../services/unidadesService";

import { obtenerCombustibles } from "../services/combustiblesService";

import { obtenerCreditos } from "../services/creditosService";

import { obtenerTransferencias } from "../services/transferenciasService";



import FormularioSolicitud from "../components/solicitudes/FormularioSolicitud";

import TablaSolicitudes from "../components/solicitudes/TablaSolicitudes";

import DetalleSolicitud from "../components/solicitudes/DetalleSolicitud";




export default function AdministrarSolicitudes(){



    const [solicitudes,setSolicitudes]=useState([]);


    const [usuarios,setUsuarios]=useState([]);


    const [unidades,setUnidades]=useState([]);


    const [combustibles,setCombustibles]=useState([]);


    const [creditos,setCreditos]=useState([]);


    const [transferencias,setTransferencias]=useState([]);



    const [mostrarFormulario,setMostrarFormulario]=useState(false);


    const [solicitudEditar,setSolicitudEditar]=useState(null);


    const [detalle,setDetalle]=useState(null);



    const [buscar,setBuscar]=useState("");







    const cargarDatos=async()=>{


        try{


            const [

                solicitudesData,

                usuariosData,

                unidadesData,

                combustiblesData,

                creditosData,

                transferenciasData


            ] = await Promise.all([


                obtenerSolicitudes(),

                obtenerUsuarios(),

                obtenerUnidades(),

                obtenerCombustibles(),

                obtenerCreditos(),

                obtenerTransferencias()


            ]);



            setSolicitudes(solicitudesData);

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









    const guardarSolicitud=async(datos)=>{


        try{


            await crearSolicitud(datos);


            await cargarDatos();


            setMostrarFormulario(false);



        }catch(error){


            console.error(error);


            alert(

                error.response?.data?.message ||

                "Error al guardar solicitud"

            );


        }


    };









    const verDetalle=async(id)=>{


        try{


            const data =
                await obtenerSolicitud(id);



            setDetalle(data);



        }catch(error){


            console.error(error);


        }


    };









    const cambiarEstado=async(

        id,

        estado

    )=>{


        try{


            let motivo=null;



            if(estado==="Rechazada"){


                motivo =
                    prompt(
                        "Ingrese motivo del rechazo"
                    );


            }




            await cambiarEstadoSolicitud(

                id,

                estado,

                motivo

            );



            await cargarDatos();



        }catch(error){


            console.error(error);


        }


    };









    const solicitudesFiltradas = solicitudes.filter((s)=>{


        const texto =

            buscar.toLowerCase();



        return (

            s.usuario?.toLowerCase()

            .includes(texto)

            ||

            s.cve?.toLowerCase()

            .includes(texto)

            ||

            s.estado?.toLowerCase()

            .includes(texto)

        );


    });









    return (

        <div>


            <h1>

                Administrar Solicitudes

            </h1>





            <input

                type="text"

                placeholder="Buscar solicitud..."

                value={buscar}

                onChange={(e)=>

                    setBuscar(e.target.value)

                }

            />







            {

                mostrarFormulario

                ?

                <FormularioSolicitud


                    usuarios={usuarios}

                    unidades={unidades}

                    combustibles={combustibles}

                    creditos={creditos}

                    transferencias={transferencias}


                    onGuardar={guardarSolicitud}


                    onCancelar={()=>{


                        setMostrarFormulario(false);


                    }}


                />


                :

                <button

                    onClick={()=>{


                        setMostrarFormulario(true);


                    }}

                >

                    Nueva Solicitud

                </button>


            }






            <hr/>






            <TablaSolicitudes


                solicitudes={solicitudesFiltradas}


                onDetalle={verDetalle}


                onEstado={cambiarEstado}


            />






            {

                detalle &&


                <DetalleSolicitud


                    solicitud={detalle}


                    cerrar={()=>setDetalle(null)}


                />


            }



        </div>

    );


}