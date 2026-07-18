import solicitudesRepository from "../repositories/solicitudesRepository.js";
import pool from "../config/connection.js";
import notificacionesService from "./notificacionesService.js";



/*
|--------------------------------------------------------------------------
| Crear solicitud
|--------------------------------------------------------------------------
*/

const create = async(data)=>{


    /*
    |--------------------------------------------------------------------------
    | Validar usuario
    |--------------------------------------------------------------------------
    */


    const [usuario] = await pool.query(

        `
        SELECT *
        FROM Usuarios
        WHERE id_usuario=?
        `,

        [
            data.id_usuario
        ]

    );



    if(usuario.length===0){

        throw new Error(
            "El usuario no existe"
        );

    }




    /*
    |--------------------------------------------------------------------------
    | Validar unidad
    |--------------------------------------------------------------------------
    */


    const [unidad] = await pool.query(

        `
        SELECT *
        FROM Unidades
        WHERE id_unidad=?
        `,

        [
            data.id_vehiculo
        ]

    );



    if(unidad.length===0){

        throw new Error(
            "La unidad no existe"
        );

    }




    const datosUnidad = unidad[0];





    /*
    |--------------------------------------------------------------------------
    | Validar asignación activa
    |--------------------------------------------------------------------------
    */


    const [asignacion] = await pool.query(

        `
        SELECT *
        FROM Asignaciones
        WHERE id_usuario=?
        AND id_unidad=?
        AND status='activo'
        `,

        [
            data.id_usuario,
            data.id_vehiculo
        ]

    );






    /*
    |--------------------------------------------------------------------------
    | Validar préstamo activo
    |--------------------------------------------------------------------------
    */


    const [prestamo] = await pool.query(

        `
        SELECT *
        FROM historial_prestamos
        WHERE id_usuario=?
        AND id_vehiculo=?
        AND fecha_fin IS NULL
        `,

        [
            data.id_usuario,
            data.id_vehiculo
        ]

    );





    if(
        asignacion.length===0 &&
        prestamo.length===0
    ){

        throw new Error(
            "El usuario no tiene asignada ni prestada esta unidad"
        );

    }





    /*
    |--------------------------------------------------------------------------
    | Validar kilometraje
    |--------------------------------------------------------------------------
    */


    if(
        data.km_actual <= datosUnidad.kilometraje_actual
    ){

        throw new Error(
            "El kilometraje debe ser mayor al registrado actualmente"
        );

    }






    /*
    |--------------------------------------------------------------------------
    | Validar litros máximos
    |--------------------------------------------------------------------------
    */


    if(
        data.litros_solicitados > 30
    ){

        throw new Error(
            "La solicitud no puede superar los 30 litros"
        );

    }







    /*
    |--------------------------------------------------------------------------
    | Validar capacidad tanque
    |--------------------------------------------------------------------------
    */


    const litrosActuales =
        Number(
            datosUnidad.litros_actuales || 0
        );



    const capacidad =
        Number(
            datosUnidad.capacidad_tanque
        );



    if(
        litrosActuales + Number(data.litros_solicitados)
        >
        capacidad
    ){

        throw new Error(
            "Los litros solicitados superan la capacidad del tanque"
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Crear solicitud
    |--------------------------------------------------------------------------
    */


    return await solicitudesRepository.create({

        ...data,

        litros_actuales:
            litrosActuales,

        estado:
            "Pendiente"

    });



};


/*
|--------------------------------------------------------------------------
| Obtener todas
|--------------------------------------------------------------------------
*/

const findAll = async()=>{


    return await solicitudesRepository.findAll();


};


/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

const findById = async(id)=>{


    const solicitud =
        await solicitudesRepository.findById(id);

    if(!solicitud){

        throw new Error(
            "La solicitud no existe"
        );

    }



    return solicitud;


};

/*
|--------------------------------------------------------------------------
| Actualizar estado
|--------------------------------------------------------------------------
*/

    const updateStatus = async(
        id,
        estado,
        motivo_rechazo
    )=>{


    const estadosValidos=[

        "Pendiente",
        "Aprobada",
        "Rechazada",
        "Auto-Aprobada",
        "Finalizado"

    ];



    if(
        !estadosValidos.includes(estado)
    ){

        throw new Error(
            "Estado inválido"
        );

    }

    if(
        estado==="Rechazada" &&
        (!motivo_rechazo ||
        motivo_rechazo.trim()==="")
    ){

        throw new Error(
            "Debe indicar el motivo del rechazo"
        );

    }    





    const solicitud =
        await solicitudesRepository.findById(id);



    if(!solicitud){

        throw new Error(
            "La solicitud no existe"
        );

    }




    const resultado =
        await solicitudesRepository.updateStatus(
            id,
            estado,
            motivo_rechazo
        );

    let mensaje = "";

    if (estado === "Aprobada") {

        mensaje =
            "Tu solicitud de combustible fue aprobada.";

    }

    if (estado === "Rechazada") {

        mensaje =
            `Tu solicitud fue rechazada. Motivo: ${motivo_rechazo}`;

    }

    if (mensaje !== "") {

        await notificacionesService.create({

            id_usuario: solicitud.id_usuario,

            id_solicitud: id,

            mensaje

        });

    }

    return resultado;    



    if(estado==="Aprobada"){

    mensaje=
    "Tu solicitud de combustible fue aprobada";


    }


    if(estado==="Rechazada"){

    mensaje=
    `Tu solicitud fue rechazada. Motivo: ${motivo_rechazo}`;

    }



    if(mensaje!==""){


    await notificacionesRepository.create({

    id_usuario:
    solicitud.id_usuario,

    id_solicitud:id,

    mensaje

    });


    }    

};

export default {

    create,
    findAll,
    findById,
    updateStatus

};