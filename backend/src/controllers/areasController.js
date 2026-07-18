import {

    getAreas,
    getAreaById,
    createArea,
    updateArea,
    deleteArea

} from "../services/areasService.js";


import {

    successResponse,
    errorResponse

} from "../utils/response.js";




/*
|--------------------------------------------------------------------------
| Obtener áreas
|--------------------------------------------------------------------------
*/

const obtenerAreas = async(req,res)=>{


    try {


        const areas =
            await getAreas();



        return successResponse(
            res,
            "Áreas obtenidas correctamente.",
            areas
        );


    }catch(error){


        return errorResponse(
            res,
            error.message
        );

    }

};




/*
|--------------------------------------------------------------------------
| Obtener área
|--------------------------------------------------------------------------
*/

const obtenerArea = async(req,res)=>{


    try {


        const {
            id
        } = req.params;



        const area =
            await getAreaById(id);



        return successResponse(
            res,
            "Área obtenida correctamente.",
            area
        );



    }catch(error){


        return errorResponse(
            res,
            error.message,
            404
        );

    }

};




/*
|--------------------------------------------------------------------------
| Crear área
|--------------------------------------------------------------------------
*/

const crearArea = async(req,res)=>{


    try {


        const area =
            await createArea(
                req.body
            );



        return successResponse(
            res,
            "Área creada correctamente.",
            area,
            201
        );



    }catch(error){


        return errorResponse(
            res,
            error.message,
            400
        );

    }

};




/*
|--------------------------------------------------------------------------
| Actualizar área
|--------------------------------------------------------------------------
*/

const actualizarArea = async(req,res)=>{


    try {


        const {
            id
        } = req.params;



        const resultado =
            await updateArea(
                id,
                req.body
            );



        return successResponse(
            res,
            resultado.message
        );



    }catch(error){


        return errorResponse(
            res,
            error.message,
            400
        );

    }

};




/*
|--------------------------------------------------------------------------
| Eliminar área
|--------------------------------------------------------------------------
*/

const eliminarArea = async(req,res)=>{


    try {


        const {
            id
        } = req.params;



        const resultado =
            await deleteArea(
                id
            );



        return successResponse(
            res,
            resultado.message
        );



    }catch(error){


        return errorResponse(
            res,
            error.message,
            400
        );

    }

};




export {
    obtenerAreas,
    obtenerArea,
    crearArea,
    actualizarArea,
    eliminarArea
};