import bcrypt from "bcrypt";

import {
    findUserForLogin,
    register as registerRepository,
    findUserByUsername,
    findUserByEmail,
    updateLastLogin,
    updatePassword,
    changePassword as changePasswordRepository
} from "../repositories/authRepository.js";

import { generateToken } from "../utils/jwt.js";

import {enviarCorreo } from "../utils/email.js";

/*
|--------------------------------------------------------------------------
| Registrar usuario
|--------------------------------------------------------------------------
*/

const register = async (usuario) => {

    if (!usuario.nombre) {
        throw new Error("El nombre es obligatorio.");
    }

    if (!usuario.usuario) {
        throw new Error("El usuario es obligatorio.");
    }

    if (!usuario.correo) {
        throw new Error("El correo es obligatorio.");
    }

    if (!usuario.password) {
        throw new Error("La contraseña es obligatoria.");
    }

    if (!usuario.rol) {
        throw new Error("El rol es obligatorio.");
    }

    const existeUsuario = await findUserByUsername(
        usuario.usuario
    );

    if (existeUsuario) {
        throw new Error("El nombre de usuario ya está registrado.");
    }

    const existeCorreo = await findUserByEmail(
        usuario.correo
    );

    if (existeCorreo) {
        throw new Error("El correo electrónico ya está registrado.");
    }

    usuario.password = await bcrypt.hash(
        usuario.password,
        10
    );

    const usuarioCreado = await registerRepository(
        usuario
    );

    return {

        message: "Usuario registrado correctamente.",

        data: usuarioCreado

    };

};

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

const login = async (credenciales) => {

    if (!credenciales.login) {
        throw new Error("El usuario o correo electronico es obligatorio.");
    }

    if (!credenciales.password) {
        throw new Error("La contraseña es obligatoria.");
    }

    const usuarioBD = await findUserForLogin(
        credenciales.login
    );

    if (!usuarioBD) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    if (usuarioBD.estado === 0) {
        throw new Error("El usuario se encuentra inactivo.");
    }

    const passwordCorrecta = await bcrypt.compare(
        credenciales.password,
        usuarioBD.password
    );

    if (!passwordCorrecta) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    await updateLastLogin(
        usuarioBD.id_usuario
    );

    const token = generateToken({

        id_usuario: usuarioBD.id_usuario,
        usuario: usuarioBD.usuario,
        rol: usuarioBD.rol

    });

    return {

        token,

        user: {

            id_usuario: usuarioBD.id_usuario,
            nombre: usuarioBD.nombre,
            usuario: usuarioBD.usuario,
            correo: usuarioBD.correo,
            rol: usuarioBD.rol,
            estado: usuarioBD.estado,
            must_change_password: usuarioBD.must_change_password,
            id_empresa: usuarioBD.id_empresa,
            id_sucursal: usuarioBD.id_sucursal,
            id_area: usuarioBD.id_area

        }

    };

};


/*
|--------------------------------------------------------------------------
| Recuperar contraseña
|--------------------------------------------------------------------------
*/

const forgotPassword = async (correo) => {


    if (!correo) {

        throw new Error(
            "El correo es obligatorio."
        );

    }



    const usuario =
        await findUserByEmail(correo);



    if (!usuario) {

        throw new Error(
            "El correo no está registrado."
        );

    }



    // Crear contraseña temporal

    const nuevaPassword =
        Math.random()
        .toString(36)
        .slice(-8);



    // Encriptar contraseña

    const passwordHash =
        await bcrypt.hash(
            nuevaPassword,
            10
        );



    // Actualizar contraseña en BD

await updatePassword(
    correo,
    passwordHash
);


console.log(
    "Contraseña temporal generada:",
    nuevaPassword
);


console.log(
    "Hash guardado:",
    passwordHash
);



    // Enviar correo

    await enviarCorreo(

        correo,

        "Recuperación de contraseña - Control Vehicular",

        `
        <h2>
        Sistema de Control Vehicular
        </h2>

        <p>
        Se generó una nueva contraseña temporal:
        </p>

        <h3>
        ${nuevaPassword}
        </h3>


        <p>
        Ingresa al sistema y cambia tu contraseña.
        </p>
        `

    );



    return {

        message:
        "Se envió una nueva contraseña al correo registrado."

    };


};    


/*
|--------------------------------------------------------------------------
| Cambiar contraseña
|--------------------------------------------------------------------------
*/

const changeUserPassword = async(datos)=>{


    const {
        id_usuario,
        passwordNueva
    } = datos;


    if(!id_usuario){

        throw new Error(
            "Usuario no identificado."
        );

    }


    if(!passwordNueva){

        throw new Error(
            "La nueva contraseña es obligatoria."
        );

    }



    const passwordHash =
        await bcrypt.hash(
            passwordNueva,
            10
        );



    await changePasswordRepository(
        id_usuario,
        passwordHash
    );



    return {

        message:
        "Contraseña actualizada correctamente."

    };


};

export {
    login,
    register, 
    forgotPassword,
    changeUserPassword
};