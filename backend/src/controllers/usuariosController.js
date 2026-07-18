import {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    changeStatus
} from "../services/usuariosService.js";

import {
    successResponse,
    errorResponse
} from "../utils/response.js";


/*
|--------------------------------------------------------------------------
| Obtener todos los usuarios
|--------------------------------------------------------------------------
*/

const obtenerUsuarios = async (req, res) => {

    try {

        const usuarios = await getUsuarios();


        return successResponse(
            res,
            "Usuarios obtenidos correctamente.",
            usuarios
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
| Obtener usuario por ID
|--------------------------------------------------------------------------
*/

const obtenerUsuario = async (req, res) => {

    try {

        const {
            id
        } = req.params;


        const usuario =
            await getUsuarioById(id);



        return successResponse(
            res,
            "Usuario obtenido correctamente.",
            usuario
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
| Crear usuario
|--------------------------------------------------------------------------
*/

const crearUsuario = async (req, res) => {

    try {


        const usuario =
            await createUsuario(
                req.body
            );


        return successResponse(
            res,
            "Usuario creado correctamente.",
            usuario,
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
| Actualizar usuario
|--------------------------------------------------------------------------
*/

const actualizarUsuario = async (req, res) => {

    try {


        const {
            id
        } = req.params;



        const resultado =
            await updateUsuario(
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
| Cambiar estado usuario
|--------------------------------------------------------------------------
*/

const cambiarEstadoUsuario = async (
    req,
    res
) => {

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


    } catch (error) {


        return errorResponse(
            res,
            error.message,
            400
        );


    }

};



export {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    cambiarEstadoUsuario
};