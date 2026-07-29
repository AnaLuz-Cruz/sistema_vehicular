import {
    findAll,
    findById,
    findDuplicate,
    create,
    update,
    updateStatus
} from "../repositories/unidadesRepository.js";



/*
|--------------------------------------------------------------------------
| Obtener unidades
|--------------------------------------------------------------------------
*/

const getUnidades = async () => {


    return await findAll();


};





/*
|--------------------------------------------------------------------------
| Obtener unidad por ID
|--------------------------------------------------------------------------
*/

const getUnidadById = async(id_unidad)=>{


    const unidad =
        await findById(
            id_unidad
        );



    if(!unidad){

        throw new Error(
            "La unidad no existe."
        );

    }


    return unidad;


};





/*
|--------------------------------------------------------------------------
| Crear unidad
|--------------------------------------------------------------------------
*/

const createUnidad = async(unidad)=>{


    if(!unidad.cve){

        throw new Error(
            "La clave de unidad es obligatoria."
        );

    }



    if(!unidad.marca){

        throw new Error(
            "La marca es obligatoria."
        );

    }



    if(!unidad.modelo){

        throw new Error(
            "El modelo es obligatorio."
        );

    }



    if(!unidad.id_combustible){

        throw new Error(
            "El tipo de combustible es obligatorio."
        );

    }


    if(!unidad.capacidad_tanque){

        throw new Error(
            "La capacidad del tanque es obligatoria."
        );

    }    

    if(!unidad.kilometraje_actual){

        throw new Error(
            "El kilometraje es obligatorio."
        );

    }    

    if(!unidad.id_empresa){

        throw new Error(
            "Seleccione una empresa."
        );

    }    

    if(!unidad.id_sucursal){

        throw new Error(
            "Seleccione una sucursal."
        );

    }    

    const existe =
        await findDuplicate(
            unidad.cve
        );



    if(existe){

        throw new Error(
            "La clave de unidad o NIV ya está registrada."
        );

    }



    const id_unidad =
        await create(
            unidad
        );



    return {

        id_unidad,

        cve:
            unidad.cve,

        marca:
            unidad.marca,

        modelo:
            unidad.modelo

    };


};


/*
|--------------------------------------------------------------------------
| Actualizar unidad
|--------------------------------------------------------------------------
*/

const updateUnidad = async(
    id_unidad,
    unidad
)=>{


    const existe =
        await findById(id_unidad);



    if(!existe){

        throw new Error(
            "La unidad no existe."
        );

    }



    await update(
        id_unidad,
        unidad
    );



    return {

        message:
        "Unidad actualizada correctamente."

    };

};





/*
|--------------------------------------------------------------------------
| Cambiar estado unidad
|--------------------------------------------------------------------------
*/

const changeStatus = async(
    id_unidad,
    estado
)=>{


    const existe =
        await findById(id_unidad);



    if(!existe){

        throw new Error(
            "La unidad no existe."
        );

    }



    await updateStatus(
        id_unidad,
        estado
    );



    return {

        message:
        "Estado actualizado correctamente."

    };

};


export {

    getUnidades,
    getUnidadById,
    createUnidad,
    updateUnidad,
    changeStatus

};