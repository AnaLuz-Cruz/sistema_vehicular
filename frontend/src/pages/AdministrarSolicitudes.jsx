import { useEffect, useState } from "react";


import {

    obtenerSolicitudes,

    obtenerSolicitud,

    cambiarEstadoSolicitud

} from "../services/solicitudesService";



import TablaSolicitudes from "../components/solicitudes/TablaSolicitudes";

import DetalleSolicitud from "../components/solicitudes/DetalleSolicitud";



export default function AdministrarSolicitudes(){


    const [

        solicitudes,

        setSolicitudes

    ] = useState([]);



    const [

        detalle,

        setDetalle

    ] = useState(null);



    const [

        buscar,

        setBuscar

    ] = useState("");






    const cargarSolicitudes = async()=>{


        try{


            const data = await obtenerSolicitudes();


            setSolicitudes(data);



        }catch(error){


            console.error(error);


        }


    };






    useEffect(()=>{


        cargarSolicitudes();


    },[]);







    const verDetalle = async(id)=>{


        try{


            const data = await obtenerSolicitud(id);


            setDetalle(data);



        }catch(error){


            console.error(error);


        }


    };








    const cambiarEstado = async(

        id,

        estado

    )=>{


        try{


            let motivo=null;



            if(estado==="Rechazada"){


                motivo = prompt(

                    "Ingrese motivo del rechazo"

                );


            }




            await cambiarEstadoSolicitud(

                id,

                estado,

                motivo

            );



            await cargarSolicitudes();



        }catch(error){


            console.error(error);


        }


    };









    const solicitudesFiltradas = solicitudes.filter((s)=>{


        const texto = buscar.toLowerCase();



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








    return(

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