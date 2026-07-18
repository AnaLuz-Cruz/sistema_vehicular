import {
    findAll,
    findById,
    create,
    update,
    updateStatus
} from "../repositories/sucursalesRepository.js";



/*
|--------------------------------------------------------------------------
| Obtener sucursales
|--------------------------------------------------------------------------
*/

const getSucursales = async () => {

    return await findAll();

};




/*
|--------------------------------------------------------------------------
| Obtener sucursal por ID
|--------------------------------------------------------------------------
*/

const getSucursalById = async (id_sucursal) => {


    const sucursal =
        await findById(
            id_sucursal
        );


    if (!sucursal) {

        throw new Error(
            "La sucursal no existe."
        );

    }


    return sucursal;

};




/*
|--------------------------------------------------------------------------
| Crear sucursal
|--------------------------------------------------------------------------
*/

const createSucursal = async (sucursal) => {


    if (!sucursal.nombre) {

        throw new Error(
            "El nombre de la sucursal es obligatorio."
        );

    }



    if (!sucursal.direccion) {

        throw new Error(
            "La dirección es obligatoria."
        );

    }



    if (!sucursal.id_empresa) {

        throw new Error(
            "La empresa es obligatoria."
        );

    }



    const id_sucursal =
        await create(
            sucursal
        );



    return {

        id_sucursal,

        nombre:
            sucursal.nombre,

        id_empresa:
            sucursal.id_empresa

    };

};




/*
|--------------------------------------------------------------------------
| Actualizar sucursal
|--------------------------------------------------------------------------
*/

const updateSucursal = async (
    id_sucursal,
    sucursal
) => {


    const existe =
        await findById(
            id_sucursal
        );



    if (!existe) {

        throw new Error(
            "La sucursal no existe."
        );

    }



    await update(
        id_sucursal,
        sucursal
    );



    return {

        message:
        "Sucursal actualizada correctamente."

    };

};




/*
|--------------------------------------------------------------------------
| Cambiar estado sucursal
|--------------------------------------------------------------------------
*/

const changeStatus = async (
    id_sucursal,
    estado
) => {


    const existe =
        await findById(
            id_sucursal
        );



    if (!existe) {

        throw new Error(
            "La sucursal no existe."
        );

    }



    if (
        estado !== 0 &&
        estado !== 1 &&
        estado !== "0" &&
        estado !== "1"
    ) {

        throw new Error(
            "El estado enviado no es válido."
        );

    }



    await updateStatus(
        id_sucursal,
        estado
    );



    return {

        message:
        "Estado de sucursal actualizado correctamente."

    };

};




export {
    getSucursales,
    getSucursalById,
    createSucursal,
    updateSucursal,
    changeStatus
};