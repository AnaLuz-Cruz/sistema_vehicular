import pool from "../config/connection.js";


/*
|--------------------------------------------------------------------------
| Registrar usuario
|--------------------------------------------------------------------------
*/

const register = async (usuario) => {

    const {
        nombre,
        usuario: username,
        password,
        correo,
        rol,
        id_empresa,
        id_sucursal,
        id_area
    } = usuario;


    const sql = `
        INSERT INTO Usuarios
        (
            nombre,
            usuario,
            password,
            correo,
            rol,
            id_empresa,
            id_sucursal,
            id_area
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const [resultado] = await pool.execute(
        sql,
        [
            nombre,
            username,
            password,
            correo,
            rol,
            id_empresa ?? null,
            id_sucursal ?? null,
            id_area ?? null
        ]
    );


    return {

        id_usuario: resultado.insertId,
        nombre,
        usuario: username,
        correo,
        rol

    };

};



/*
|--------------------------------------------------------------------------
| Login usuario
|--------------------------------------------------------------------------
*/

const findUserForLogin = async (login) => {


    const sql = `
        SELECT
            id_usuario,
            nombre,
            usuario,
            password,
            correo,
            rol,
            estado,
            must_change_password,
            fecha_ultimo_login,
            id_empresa,
            id_sucursal,
            id_area
        FROM Usuarios
        WHERE usuario = ?
        OR correo = ?
        LIMIT 1                
    `;


    const [rows] = await pool.execute(
        sql,
        [
            login,
            login
        ]
    );


    return rows[0];


};

const findUserByUsername = async (usuario) => {

    const sql = `
        SELECT id_usuario
        FROM Usuarios
        WHERE usuario = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [usuario]);

    return rows[0] || null;

};

const findUserByEmail = async (correo) => {

    const sql = `
        SELECT id_usuario
        FROM Usuarios
        WHERE correo = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [correo]);

    return rows[0] || null;

};

const updateLastLogin = async (idUsuario) => {

    const sql = `
        UPDATE Usuarios
        SET fecha_ultimo_login = NOW()
        WHERE id_usuario = ?
    `;

    await pool.execute(sql, [idUsuario]);

};

/*
|--------------------------------------------------------------------------
| Actualizar contraseña
|--------------------------------------------------------------------------
*/

const updatePassword = async (
    correo,
    password
) => {


    const sql = `
        UPDATE Usuarios
        SET password = ?
        WHERE correo = ?
    `;


    await pool.execute(
        sql,
        [
            password,
            correo
        ]
    );

};


/*
|--------------------------------------------------------------------------
| Cambiar contraseña
|--------------------------------------------------------------------------
*/

const changePassword = async (
    id_usuario,
    password
) => {


    const sql = `
        UPDATE Usuarios
        SET 
            password = ?,
            must_change_password = 0
        WHERE id_usuario = ?
    `;


    await pool.execute(
        sql,
        [
            password,
            id_usuario
        ]
    );


};




export {
    findUserForLogin,
    register,
    findUserByUsername,
    findUserByEmail,
    updateLastLogin,
    updatePassword,
    changePassword
};