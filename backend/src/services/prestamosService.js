import prestamosRepository from "../repositories/prestamosRepository.js";
import pool from "../config/connection.js";



/*
|--------------------------------------------------------------------------
| Crear préstamo
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



    if(usuario.length === 0){


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
        SELECT
            u.*,
            usr.nombre AS responsable

        FROM Unidades u

        LEFT JOIN Usuarios usr
        ON u.id_responsable = usr.id_usuario

        WHERE u.id_unidad=?
        `,

        [
            data.id_vehiculo
        ]

    );

    if(unidad.length === 0){


        throw new Error(
            "La unidad no existe"
        );


    }


/*
|--------------------------------------------------------------------------
| Validar unidades utilitarias
|--------------------------------------------------------------------------
*/

    if(
        unidad[0].es_utilitario === "Utilitario"
    ){


        if(!unidad[0].id_responsable){


            throw new Error(
                "La unidad utilitaria no tiene responsable asignado"
            );


        }


    }    

    if(
        unidad[0].id_responsable == data.id_usuario
    ){

        throw new Error(
            "El responsable de la unidad no requiere solicitar préstamo"
        );

    }    





    /*
    |--------------------------------------------------------------------------
    | Validar que la unidad no esté prestada
    |--------------------------------------------------------------------------
    */


    const prestamoActivo =
        await prestamosRepository.findActiveByUnit(
            data.id_vehiculo
        );



    if(prestamoActivo){


        throw new Error(
            "La unidad ya tiene un préstamo activo"
        );


    }






    /*
    |--------------------------------------------------------------------------
    | Crear préstamo
    |--------------------------------------------------------------------------
    */


    return await prestamosRepository.create(data);



};








/*
|--------------------------------------------------------------------------
| Obtener todos
|--------------------------------------------------------------------------
*/

const findAll = async()=>{


    return await prestamosRepository.findAll();


};








/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

const findById = async(id)=>{


    const prestamo =
        await prestamosRepository.findById(id);



    if(!prestamo){


        throw new Error(
            "El préstamo no existe"
        );


    }



    return prestamo;


};








/*
|--------------------------------------------------------------------------
| Actualizar préstamo
|--------------------------------------------------------------------------
*/

const update = async(id,data)=>{


    const prestamo =
        await prestamosRepository.findById(id);



    if(!prestamo){


        throw new Error(
            "El préstamo no existe"
        );


    }





    /*
    Si cambia la unidad,
    validar disponibilidad
    */


    if(data.id_vehiculo){


        const activo =
            await prestamosRepository.findActiveByUnit(
                data.id_vehiculo
            );



        if(
            activo &&
            activo.id_historial != id
        ){


            throw new Error(
                "La unidad ya está prestada"
            );


        }


    }




    return await prestamosRepository.update(
        id,
        data
    );


};








/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

const updateStatus = async(id,estado)=>{


    const estadosValidos=[

        "pendiente",
        "aprobado",
        "entregado",
        "devuelto",
        "cancelado"

    ];



    if(!estadosValidos.includes(estado)){


        throw new Error(
            "Estado inválido"
        );


    }





    const prestamo =
        await prestamosRepository.findById(id);



    if(!prestamo){


        throw new Error(
            "El préstamo no existe"
        );


    }







    /*
    Si se devuelve la unidad,
    guardar fecha de finalización
    */


    if(estado==="devuelto"){


        await pool.query(

            `
            UPDATE historial_prestamos

            SET fecha_fin=NOW()

            WHERE id_historial=?
            `,

            [
                id
            ]

        );


    }






    return await prestamosRepository.updateStatus(
        id,
        estado
    );


};

export default {


    create,
    findAll,
    findById,
    update,
    updateStatus

};