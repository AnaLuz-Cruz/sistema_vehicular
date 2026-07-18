import {
    login as loginService,
    register as registerService,
    forgotPassword as forgotPasswordService,
    changeUserPassword
} from "../services/authService.js";


import {
    successResponse,
    errorResponse
} from "../utils/response.js";


/*
|--------------------------------------------------------------------------
| Registro de usuario
|--------------------------------------------------------------------------
*/

const register = async (req, res) => {

    try {

        const resultado =
            await registerService(req.body);


        return successResponse(
            res,
            resultado.message,
            resultado.data,
            201
        );


    } catch(error) {

        return errorResponse(
            res,
            error.message,
            400
        );

    }

};


/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

const login = async (req, res) => {

    try {

        const respuesta =
            await loginService(req.body);


        return successResponse(
            res,
            "Inicio de sesion realizado correctamente.",
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



/*
|--------------------------------------------------------------------------
| Recuperar contraseña
|--------------------------------------------------------------------------
*/

const forgotPassword = async (req, res) => {

    try {

        const resultado =
            await forgotPasswordService(
                req.body.correo
            );


        return successResponse(
            res,
            resultado.message,
            null
        );


    } catch(error) {

        return errorResponse(
            res,
            error.message,
            400
        );

    }

};

/*
|--------------------------------------------------------------------------
| Cambiar contraseña
|--------------------------------------------------------------------------
*/

const changePassword = async(req,res)=>{


    try{


        const resultado =
            await changeUserPassword(
                req.body
            );


        return successResponse(
            res,
            resultado.message,
            null
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
    login,
    register,
    forgotPassword,
    changePassword
};