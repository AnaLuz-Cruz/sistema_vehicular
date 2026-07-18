import pool from "../config/connection.js";


/*
|--------------------------------------------------------------------------
| Crear crédito
|--------------------------------------------------------------------------
*/

const create = async (data) => {

    const sql = `
        INSERT INTO creditos_gasolineras
        (
            nombre_credito,
            rfc,
            regimen_fiscal,
            direccion,
            telefono,
            inicio_convenio,
            vigencia,
            limite_credito,
            estado
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [

        data.nombre_credito,
        data.rfc || null,
        data.regimen_fiscal || null,
        data.direccion || null,
        data.telefono || null,
        data.inicio_convenio || null,
        data.vigencia || null,
        data.limite_credito || null,
        data.estado ?? 1

    ];

    const [result] = await pool.query(sql, values);

    return await findById(result.insertId);

};



/*
|--------------------------------------------------------------------------
| Obtener todos
|--------------------------------------------------------------------------
*/

const findAll = async () => {

    const sql = `
        SELECT *
        FROM creditos_gasolineras
        ORDER BY id_credito DESC
    `;

    const [rows] = await pool.query(sql);

    return rows;

};



/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

const findById = async (id) => {

    const sql = `
        SELECT *
        FROM creditos_gasolineras
        WHERE id_credito = ?
    `;

    const [rows] = await pool.query(sql, [id]);

    return rows[0];

};



/*
|--------------------------------------------------------------------------
| Buscar por nombre
|--------------------------------------------------------------------------
*/

const findByNombre = async (nombre) => {

    const sql = `
        SELECT *
        FROM creditos_gasolineras
        WHERE nombre_credito = ?
    `;

    const [rows] = await pool.query(sql, [nombre]);

    return rows[0];

};



/*
|--------------------------------------------------------------------------
| Actualizar
|--------------------------------------------------------------------------
*/

const update = async (id, data) => {

    const sql = `
        UPDATE creditos_gasolineras
        SET
            nombre_credito = ?,
            rfc = ?,
            regimen_fiscal = ?,
            direccion = ?,
            telefono = ?,
            inicio_convenio = ?,
            vigencia = ?,
            limite_credito = ?
        WHERE id_credito = ?
    `;

    const values = [

        data.nombre_credito,
        data.rfc || null,
        data.regimen_fiscal || null,
        data.direccion || null,
        data.telefono || null,
        data.inicio_convenio || null,
        data.vigencia || null,
        data.limite_credito || null,
        id

    ];

    await pool.query(sql, values);

    return await findById(id);

};



/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

const updateStatus = async (id, estado) => {

    const sql = `
        UPDATE creditos_gasolineras
        SET estado = ?
        WHERE id_credito = ?
    `;

    await pool.query(sql, [estado, id]);

    return await findById(id);

};



export default {

    create,
    findAll,
    findById,
    findByNombre,
    update,
    updateStatus

};