import {
    findAll,
    findById,
    create,
    update,
    updateStatus
} from "../repositories/empresasRepository.js";


/*
|--------------------------------------------------------------------------
| Obtener empresas
|--------------------------------------------------------------------------
*/

const getEmpresas = async () => {

    return await findAll();

};



/*
|--------------------------------------------------------------------------
| Obtener empresa por ID
|--------------------------------------------------------------------------
*/

const getEmpresaById = async (id_empresa) => {


    const empresa = await findById(
        id_empresa
    );


    if (!empresa) {

        throw new Error(
            "La empresa no existe."
        );

    }


    return empresa;

};



/*
|--------------------------------------------------------------------------
| Crear empresa
|--------------------------------------------------------------------------
*/

const createEmpresa = async (empresa) => {


    if (!empresa.razon_social) {

        throw new Error(
            "La razón social es obligatoria."
        );

    }


    if (!empresa.rfc) {

        throw new Error(
            "El RFC es obligatorio."
        );

    }


    if (!empresa.nombre_comercial) {

        throw new Error(
            "El nombre comercial es obligatorio."
        );

    }



    const id_empresa =
        await create(
            empresa
        );



    return {

        id_empresa,

        razon_social:
            empresa.razon_social,

        rfc:
            empresa.rfc,

        nombre_comercial:
            empresa.nombre_comercial

    };

};



/*
|--------------------------------------------------------------------------
| Actualizar empresa
|--------------------------------------------------------------------------
*/

const updateEmpresa = async (
    id_empresa,
    empresa
) => {


    const existe =
        await findById(
            id_empresa
        );



    if (!existe) {

        throw new Error(
            "La empresa no existe."
        );

    }



    await update(
        id_empresa,
        empresa
    );



    return {

        message:
        "Empresa actualizada correctamente."

    };

};



/*
|--------------------------------------------------------------------------
| Cambiar estado empresa
|--------------------------------------------------------------------------
*/

const changeStatus = async (
    id_empresa,
    estatus
) => {


    const existe =
        await findById(
            id_empresa
        );



    if (!existe) {

        throw new Error(
            "La empresa no existe."
        );

    }



    if (
        estatus !== "Activa" &&
        estatus !== "Inactiva"
    ) {

        throw new Error(
            "El estado enviado no es válido."
        );

    }



    await updateStatus(
        id_empresa,
        estatus
    );



    return {

        message:
        "Estado de empresa actualizado correctamente."

    };

};



export {
    getEmpresas,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    changeStatus
};