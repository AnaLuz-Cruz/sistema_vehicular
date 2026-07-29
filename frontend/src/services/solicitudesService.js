import api from "../api/axios";


// Obtener todas

export const obtenerSolicitudes = async()=>{


    const response =
        await api.get("/solicitudes");


    return response.data.data;


};





// Obtener por ID

export const obtenerSolicitud = async(id)=>{


    const response =
        await api.get(
            `/solicitudes/${id}`
        );


    return response.data.data;


};






// Crear

export const crearSolicitud = async(datos)=>{


    const response =
        await api.post(

            "/solicitudes",

            datos

        );


    return response.data;


};






// Cambiar estado

export const cambiarEstadoSolicitud = async(

    id,

    estado,

    motivo_rechazo=null

)=>{


    const response =
        await api.patch(

            `/solicitudes/${id}/status`,

            {

                estado,

                motivo_rechazo

            }

        );



    return response.data;


};