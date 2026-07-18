import asignacionesRepository from "../repositories/asignacionesRepository.js";
import pool from "../config/connection.js";


/*
|--------------------------------------------------------------------------
| Crear asignación
|--------------------------------------------------------------------------
*/

const create = async(data)=>{

    if (!data) {
        throw new Error("No se recibieron datos.");
    }

    if (!data.id_unidad) {
        throw new Error("La unidad es obligatoria.");
    }

    if (!data.fecha_asignacion) {
        throw new Error("La fecha de asignación es obligatoria.");
    }

    /*
    |--------------------------------------------------------------------------
    | Validar que exista la unidad
    |--------------------------------------------------------------------------
    */


    const [unidad] = await pool.query(
        `
        SELECT *
        FROM Unidades
        WHERE id_unidad=?
        `,
        [
            data.id_unidad
        ]
    );


    if(unidad.length === 0){

        throw new Error(
            "La unidad no existe"
        );

    }



    /*
    |--------------------------------------------------------------------------
    | Validar que la unidad no tenga responsable activo
    |--------------------------------------------------------------------------
    */


    const asignacionUnidad =
        await asignacionesRepository.findActiveByUnit(
            data.id_unidad
        );



    if(asignacionUnidad){


        throw new Error(
            "La unidad ya tiene una asignación activa"
        );


    }





    /*
    |--------------------------------------------------------------------------
    | Validar usuario
    |--------------------------------------------------------------------------
    */


    if(data.id_usuario){


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
        No validamos rol porque todos los usuarios
        pueden manejar unidades
        */


    }

    return await asignacionesRepository.create(data);


};





/*
|--------------------------------------------------------------------------
| Obtener todas las asignaciones
|--------------------------------------------------------------------------
*/

const findAll = async()=>{


    return await asignacionesRepository.findAll();


};





/*
|--------------------------------------------------------------------------
| Obtener asignación por ID
|--------------------------------------------------------------------------
*/

const findById = async(id)=>{


    const asignacion =
        await asignacionesRepository.findById(id);



    if(!asignacion){


        throw new Error(
            "La asignación no existe"
        );


    }



    return asignacion;


};






/*
|--------------------------------------------------------------------------
| Actualizar asignación
|--------------------------------------------------------------------------
*/

const update = async(id,data)=>{


    const asignacion =
        await asignacionesRepository.findById(id);



    if(!asignacion){


        throw new Error(
            "La asignación no existe"
        );


    }



    /*
    Si cambia de unidad,
    validar que la nueva unidad
    no tenga asignación activa
    */


    if(data.id_unidad){


        const asignacionUnidad =
            await asignacionesRepository.findActiveByUnit(
                data.id_unidad
            );



        if(
            asignacionUnidad &&
            asignacionUnidad.id_asignacion != id
        ){

            throw new Error(
                "La unidad ya tiene otro responsable activo"
            );

        }


    }




    return await asignacionesRepository.update(
        id,
        data
    );


};







/*
|--------------------------------------------------------------------------
| Cambiar status
|--------------------------------------------------------------------------
*/

const updateStatus = async(id,status)=>{


    const estadosValidos=[

        "activo",
        "inactivo"

    ];



    if(!estadosValidos.includes(status)){


        throw new Error(
            "Status inválido"
        );


    }



    const asignacion =
        await asignacionesRepository.findById(id);



    if(!asignacion){


        throw new Error(
            "La asignación no existe"
        );


    }



    return await asignacionesRepository.updateStatus(
        id,
        status
    );


};





export default {


    create,
    findAll,
    findById,
    update,
    updateStatus

};