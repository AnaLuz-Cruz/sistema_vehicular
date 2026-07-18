import pool from "../config/connection.js";


/*
|--------------------------------------------------------------------------
| Obtener todas las sucursales
|--------------------------------------------------------------------------
*/

const findAll = async () => {


    const sql = `
        SELECT
            s.id_sucursal,
            s.nombre,
            s.direccion,
            s.telefono,
            s.correo,
            s.horario,
            s.estado,
            s.id_empresa,

            e.razon_social AS empresa

        FROM Sucursales s

        INNER JOIN empresas e
            ON s.id_empresa = e.id_empresa

        ORDER BY s.id_sucursal DESC
    `;


    const [rows] = await pool.execute(sql);


    return rows;

};




/*
|--------------------------------------------------------------------------
| Obtener sucursal por ID
|--------------------------------------------------------------------------
*/

const findById = async (id_sucursal) => {


    const sql = `
        SELECT
            s.id_sucursal,
            s.nombre,
            s.direccion,
            s.telefono,
            s.correo,
            s.horario,
            s.estado,
            s.id_empresa,

            e.razon_social AS empresa

        FROM Sucursales s

        INNER JOIN empresas e
            ON s.id_empresa = e.id_empresa

        WHERE s.id_sucursal = ?

        LIMIT 1
    `;


    const [rows] = await pool.execute(
        sql,
        [id_sucursal]
    );


    return rows[0] || null;

};




/*
|--------------------------------------------------------------------------
| Crear sucursal
|--------------------------------------------------------------------------
*/

const create = async (sucursal) => {


    const {
        nombre,
        direccion,
        telefono,
        correo,
        horario,
        id_empresa
    } = sucursal;



    const sql = `
        INSERT INTO Sucursales
        (
            nombre,
            direccion,
            telefono,
            correo,
            horario,
            id_empresa
        )

        VALUES
        (?, ?, ?, ?, ?, ?)
    `;



    const [resultado] = await pool.execute(
        sql,
        [
            nombre,
            direccion,
            telefono ?? null,
            correo ?? null,
            horario ?? null,
            id_empresa
        ]
    );


    return resultado.insertId;

};




/*
|--------------------------------------------------------------------------
| Actualizar sucursal
|--------------------------------------------------------------------------
*/

const update = async (
    id_sucursal,
    sucursal
) => {


    const {
        nombre,
        direccion,
        telefono,
        correo,
        horario
    } = sucursal;



    const sql = `
        UPDATE Sucursales

        SET
            nombre = ?,
            direccion = ?,
            telefono = ?,
            correo = ?,
            horario = ?

        WHERE id_sucursal = ?
    `;


    await pool.execute(
        sql,
        [
            nombre,
            direccion,
            telefono ?? null,
            correo ?? null,
            horario ?? null,
            id_sucursal
        ]
    );

};




/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

const updateStatus = async (
    id_sucursal,
    estado
) => {


    const sql = `
        UPDATE Sucursales

        SET estado = ?

        WHERE id_sucursal = ?
    `;


    await pool.execute(
        sql,
        [
            estado,
            id_sucursal
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