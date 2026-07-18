import {
    getUnidades,
    getUnidadById,
    createUnidad,
    updateUnidad,
    changeStatus
} from "../services/unidadesService.js";


import {
    successResponse,
    errorResponse
} from "../utils/response.js";



/*
|--------------------------------------------------------------------------
| Obtener todas las unidades
|--------------------------------------------------------------------------
*/

const obtenerUnidades = async (req, res) => {


    try {


        const unidades =
            await getUnidades();



        return successResponse(
            res,
            "Unidades obtenidas correctamente.",
            unidades
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
| Obtener unidad por ID
|--------------------------------------------------------------------------
*/

const obtenerUnidad = async (req, res) => {


    try {


        const {
            id
        } = req.params;



        const unidad =
            await getUnidadById(
                id
            );



        return successResponse(
            res,
            "Unidad obtenida correctamente.",
            unidad
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
| Crear unidad
|--------------------------------------------------------------------------
*/

const crearUnidad = async (req, res) => {


    try {


        const unidad =
            await createUnidad(
                req.body
            );



        return successResponse(
            res,
            "Unidad creada correctamente.",
            unidad,
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
| Actualizar unidad
|--------------------------------------------------------------------------
*/

const actualizarUnidad = async (req, res) => {


    try {


        const {
            id
        } = req.params;



        const unidad =
            await updateUnidad(
                id,
                req.body
            );



        return successResponse(
            res,
            "Unidad actualizada correctamente.",
            unidad
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
| Cambiar estado unidad
|--------------------------------------------------------------------------
*/

const cambiarEstadoUnidad = async (req, res) => {

    try {

        const {
            id
        } = req.params;


        const {
            estado
        } = req.body;



        const respuesta =
            await changeStatus(
                id,
                estado
            );


        return successResponse(
            res,
            "Estado de unidad actualizado correctamente.",
            respuesta
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

    obtenerUnidades,
    obtenerUnidad,
    crearUnidad,
    actualizarUnidad,
    cambiarEstadoUnidad

};