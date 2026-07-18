import {
    findAll,
    findById,
    create,
    update,
    remove
} from "../repositories/areasRepository.js";



/*
|--------------------------------------------------------------------------
| Obtener áreas
|--------------------------------------------------------------------------
*/

const getAreas = async () => {

    return await findAll();

};



/*
|--------------------------------------------------------------------------
| Obtener área por ID
|--------------------------------------------------------------------------
*/

const getAreaById = async (id_area) => {


    const area =
        await findById(id_area);



    if (!area) {

        throw new Error(
            "El área no existe."
        );

    }



    return area;

};




/*
|--------------------------------------------------------------------------
| Crear área
|--------------------------------------------------------------------------
*/

const createArea = async (area) => {


    if (!area.nombre) {

        throw new Error(
            "El nombre del área es obligatorio."
        );

    }



    const id_area =
        await create(area);



    return {

        id_area,

        nombre:
            area.nombre

    };

};




/*
|--------------------------------------------------------------------------
| Actualizar área
|--------------------------------------------------------------------------
*/

const updateArea = async (
    id_area,
    area
) => {


    const existe =
        await findById(id_area);



    if (!existe) {

        throw new Error(
            "El área no existe."
        );

    }



    if (!area.nombre) {

        throw new Error(
            "El nombre del área es obligatorio."
        );

    }



    await update(
        id_area,
        area
    );



    return {

        message:
        "Área actualizada correctamente."

    };

};




/*
|--------------------------------------------------------------------------
| Eliminar área
|--------------------------------------------------------------------------
*/

const deleteArea = async (
    id_area
) => {


    const existe =
        await findById(id_area);



    if (!existe) {

        throw new Error(
            "El área no existe."
        );

    }



    await remove(
        id_area
    );



    return {

        message:
        "Área eliminada correctamente."

    };

};



export {
    getAreas,
    getAreaById,
    createArea,
    updateArea,
    deleteArea
};