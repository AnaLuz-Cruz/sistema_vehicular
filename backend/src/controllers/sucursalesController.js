import {
    getSucursales,
    getSucursalById,
    createSucursal,
    updateSucursal,
    changeStatus
} from "../services/sucursalesService.js";


import {
    successResponse,
    errorResponse
} from "../utils/response.js";



/*
|--------------------------------------------------------------------------
| Obtener sucursales
|--------------------------------------------------------------------------
*/

const obtenerSucursales = async (req,res)=>{

    try {

        const sucursales =
            await getSucursales();


        return successResponse(
            res,
            "Sucursales obtenidas correctamente.",
            sucursales
        );


    } catch(error){

        return errorResponse(
            res,
            error.message
        );

    }

};




/*
|--------------------------------------------------------------------------
| Obtener sucursal por ID
|--------------------------------------------------------------------------
*/

const obtenerSucursal = async(req,res)=>{


    try {


        const {
            id
        } = req.params;



        const sucursal =
            await getSucursalById(id);



        return successResponse(
            res,
            "Sucursal obtenida correctamente.",
            sucursal
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
| Crear sucursal
|--------------------------------------------------------------------------
*/

const crearSucursal = async(req,res)=>{


    try {


        const sucursal =
            await createSucursal(
                req.body
            );



        return successResponse(
            res,
            "Sucursal creada correctamente.",
            sucursal,
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
| Actualizar sucursal
|--------------------------------------------------------------------------
*/

const actualizarSucursal = async(req,res)=>{


    try {


        const {
            id
        } = req.params;



        const resultado =
            await updateSucursal(
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
| Cambiar estado
|--------------------------------------------------------------------------
*/

const actualizarEstadoSucursal = async(req,res)=>{


    try {


        const {
            id
        } = req.params;



        const {
            estado
        } = req.body;



        const resultado =
            await changeStatus(
                id,
                estado
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
    obtenerSucursales,
    obtenerSucursal,
    crearSucursal,
    actualizarSucursal,
    actualizarEstadoSucursal
};