import {
    getEmpresas,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    changeStatus
} from "../services/empresasService.js";


import {
    successResponse,
    errorResponse
} from "../utils/response.js";



/*
|--------------------------------------------------------------------------
| Obtener empresas
|--------------------------------------------------------------------------
*/

const obtenerEmpresas = async (req, res) => {

    try {

        const empresas =
            await getEmpresas();


        return successResponse(
            res,
            "Empresas obtenidas correctamente.",
            empresas
        );


    } catch (error) {

        return errorResponse(
            res,
            error.message
        );

    }

};



/*
|--------------------------------------------------------------------------
| Obtener empresa por ID
|--------------------------------------------------------------------------
*/

const obtenerEmpresa = async (req, res) => {

    try {

        const {
            id
        } = req.params;


        const empresa =
            await getEmpresaById(id);



        return successResponse(
            res,
            "Empresa obtenida correctamente.",
            empresa
        );


    } catch (error) {


        return errorResponse(
            res,
            error.message,
            404
        );


    }

};




/*
|--------------------------------------------------------------------------
| Crear empresa
|--------------------------------------------------------------------------
*/

const crearEmpresa = async (req, res) => {

    try {


        const empresa =
            await createEmpresa(
                req.body
            );



        return successResponse(
            res,
            "Empresa creada correctamente.",
            empresa,
            201
        );


    } catch (error) {


        return errorResponse(
            res,
            error.message,
            400
        );


    }

};




/*
|--------------------------------------------------------------------------
| Actualizar empresa
|--------------------------------------------------------------------------
*/

const actualizarEmpresa = async (req, res) => {


    try {


        const {
            id
        } = req.params;



        const resultado =
            await updateEmpresa(
                id,
                req.body
            );



        return successResponse(
            res,
            resultado.message
        );



    } catch (error) {


        return errorResponse(
            res,
            error.message,
            400
        );


    }

};




/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

const actualizarEstadoEmpresa = async (
    req,
    res
) => {


    try {


        const {
            id
        } = req.params;



        const {
            estatus
        } = req.body;



        const resultado =
            await changeStatus(
                id,
                estatus
            );



        return successResponse(
            res,
            resultado.message
        );


    } catch (error) {


        return errorResponse(
            res,
            error.message,
            400
        );


    }

};



export {
    obtenerEmpresas,
    obtenerEmpresa,
    crearEmpresa,
    actualizarEmpresa,
    actualizarEstadoEmpresa
};