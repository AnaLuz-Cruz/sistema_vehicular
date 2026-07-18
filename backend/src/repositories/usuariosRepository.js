import pool from "../config/connection.js";


/*
|--------------------------------------------------------------------------
| Obtener todos los usuarios
|--------------------------------------------------------------------------
*/

const findAll = async () => {

    const sql = `
        SELECT
            u.id_usuario,
            u.nombre,
            u.usuario,
            u.correo,
            u.rol,
            u.estado,
            u.fecha_registro,
            u.fecha_ultimo_login,

            e.razon_social AS empresa,
            s.nombre AS sucursal,
            a.nombre AS area

        FROM Usuarios u

        LEFT JOIN empresas e
            ON u.id_empresa = e.id_empresa

        LEFT JOIN Sucursales s
            ON u.id_sucursal = s.id_sucursal

        LEFT JOIN areas a
            ON u.id_area = a.id_area

        ORDER BY u.id_usuario DESC
    `;


    const [rows] = await pool.execute(sql);

    return rows;

};


/*
|--------------------------------------------------------------------------
| Obtener usuario por ID
|--------------------------------------------------------------------------
*/

const findById = async (id_usuario) => {


    const sql = `
        SELECT
            id_usuario,
            nombre,
            usuario,
            correo,
            rol,
            estado,
            id_empresa,
            id_sucursal,
            id_area,
            fecha_registro,
            fecha_ultimo_login

        FROM Usuarios

        WHERE id_usuario = ?

        LIMIT 1
    `;


    const [rows] = await pool.execute(
        sql,
        [id_usuario]
    );


    return rows[0] || null;

};



/*
|--------------------------------------------------------------------------
| Crear usuario
|--------------------------------------------------------------------------
*/

const create = async (usuario) => {


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


    return resultado.insertId;

};



/*
|--------------------------------------------------------------------------
| Actualizar usuario
|--------------------------------------------------------------------------
*/

const update = async (
    id_usuario,
    usuario
) => {


    const {
        nombre,
        correo,
        rol,
        id_empresa,
        id_sucursal,
        id_area
    } = usuario;


    const sql = `
        UPDATE Usuarios

        SET
            nombre = ?,
            correo = ?,
            rol = ?,
            id_empresa = ?,
            id_sucursal = ?,
            id_area = ?

        WHERE id_usuario = ?
    `;


    await pool.execute(
        sql,
        [
            nombre,
            correo,
            rol,
            id_empresa ?? null,
            id_sucursal ?? null,
            id_area ?? null,
            id_usuario
        ]
    );


};



/*
|--------------------------------------------------------------------------
| Cambiar estado usuario
|--------------------------------------------------------------------------
*/

const updateStatus = async (
    id_usuario,
    estado
) => {


    const sql = `
        UPDATE Usuarios

        SET estado = ?

        WHERE id_usuario = ?
    `;


    await pool.execute(
        sql,
        [
            estado,
            id_usuario
        ]
    );


};



export {
    findAll,
    findById,
    create,
    update,
    updateStatus
};