import bcrypt from "bcrypt";

import {
    findAll,
    findById,
    create,
    update,
    updateStatus
} from "../repositories/usuariosRepository.js";

import {
    findUserByUsername,
    findUserByEmail
} from "../repositories/authRepository.js";


/*
|--------------------------------------------------------------------------
| Obtener usuarios
|--------------------------------------------------------------------------
*/

const getUsuarios = async () => {

    return await findAll();

};


/*
|--------------------------------------------------------------------------
| Obtener usuario por ID
|--------------------------------------------------------------------------
*/

const getUsuarioById = async (id_usuario) => {

    const usuario = await findById(id_usuario);


    if (!usuario) {

        throw new Error(
            "El usuario no existe."
        );

    }


    return usuario;

};



/*
|--------------------------------------------------------------------------
| Crear usuario
|--------------------------------------------------------------------------
*/

const createUsuario = async (usuario) => {


    if (!usuario.nombre) {
        throw new Error(
            "El nombre es obligatorio."
        );
    }


    if (!usuario.usuario) {
        throw new Error(
            "El nombre de usuario es obligatorio."
        );
    }


    if (!usuario.password) {
        throw new Error(
            "La contraseña es obligatoria."
        );
    }


    if (!usuario.correo) {
        throw new Error(
            "El correo es obligatorio."
        );
    }


    if (!usuario.rol) {
        throw new Error(
            "El rol es obligatorio."
        );
    }



    const existeUsuario =
        await findUserByUsername(
            usuario.usuario
        );


    if (existeUsuario) {

        throw new Error(
            "El usuario ya está registrado."
        );

    }



    const existeCorreo =
        await findUserByEmail(
            usuario.correo
        );


    if (existeCorreo) {

        throw new Error(
            "El correo ya está registrado."
        );

    }



    usuario.password =
        await bcrypt.hash(
            usuario.password,
            10
        );



    const id_usuario =
        await create(usuario);



    return {

        id_usuario,
        nombre: usuario.nombre,
        usuario: usuario.usuario,
        correo: usuario.correo,
        rol: usuario.rol

    };

};



/*
|--------------------------------------------------------------------------
| Actualizar usuario
|--------------------------------------------------------------------------
*/

const updateUsuario = async (
    id_usuario,
    usuario
) => {


    const existe =
        await findById(id_usuario);



    if (!existe) {

        throw new Error(
            "El usuario no existe."
        );

    }



    await update(
        id_usuario,
        usuario
    );


    return {

        message:
        "Usuario actualizado correctamente."

    };

};



/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

const changeStatus = async (
    id_usuario,
    estado
) => {


    const existe =
        await findById(id_usuario);



    if (!existe) {

        throw new Error(
            "El usuario no existe."
        );

    }



    await updateStatus(
        id_usuario,
        estado
    );



    return {
        message: "Estado del usuario actualizado correctamente."
    };

};



export {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    changeStatus
};