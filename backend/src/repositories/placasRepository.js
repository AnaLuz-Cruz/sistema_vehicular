import pool from "../config/connection.js";

/*
|--------------------------------------------------------------------------
| Crear placa
|--------------------------------------------------------------------------
*/

const create = async (data) => {

    const sql = `
        INSERT INTO Placas
        (
            folio,
            placa,
            fecha_expedicion,
            fecha_vigencia,
            url_placa_frontal,
            url_placa_trasera,
            requiere_renovacion,
            status,
            monto_pago,
            url_comprobante_pago,
            url_tarjeta_circulacion,
            id_unidad
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [

        data.folio || null,
        data.placa,
        data.fecha_expedicion || null,
        data.fecha_vigencia || null,
        data.url_placa_frontal || null,
        data.url_placa_trasera || null,
        data.requiere_renovacion || 0,
        data.status || "activa",
        data.monto_pago,
        data.url_comprobante_pago || null,
        data.url_tarjeta_circulacion || null,
        data.id_unidad || null

    ];

    const [result] = await pool.query(sql, values);

    return await findById(result.insertId);

};



/*
|--------------------------------------------------------------------------
| Obtener todas las placas
|--------------------------------------------------------------------------
*/

const findAll = async () => {

    const sql = `
        SELECT

            p.id_placa,
            p.folio,
            p.placa,
            p.fecha_expedicion,
            p.fecha_vigencia,
            p.requiere_renovacion,
            p.status,
            p.monto_pago,

            u.id_unidad,
            u.cve,
            u.marca,
            u.modelo

        FROM Placas p

        LEFT JOIN Unidades u
            ON p.id_unidad = u.id_unidad

        ORDER BY p.id_placa DESC
    `;

    const [rows] = await pool.query(sql);

    return rows;

};



/*
|--------------------------------------------------------------------------
| Obtener placa por ID
|--------------------------------------------------------------------------
*/

const findById = async (id) => {

    const sql = `
        SELECT

            p.*,

            u.cve,
            u.marca,
            u.modelo

        FROM Placas p

        LEFT JOIN Unidades u
            ON p.id_unidad = u.id_unidad

        WHERE p.id_placa = ?
    `;

    const [rows] = await pool.query(sql, [id]);

    return rows[0];

};



/*
|--------------------------------------------------------------------------
| Buscar por número de placa
|--------------------------------------------------------------------------
*/

const findByPlaca = async (placa) => {

    const sql = `
        SELECT *
        FROM Placas
        WHERE placa = ?
    `;

    const [rows] = await pool.query(sql, [placa]);

    return rows[0];

};



/*
|--------------------------------------------------------------------------
| Actualizar placa
|--------------------------------------------------------------------------
*/

const update = async (id, data) => {

    const sql = `
        UPDATE Placas
        SET
            folio = ?,
            placa = ?,
            fecha_expedicion = ?,
            fecha_vigencia = ?,
            url_placa_frontal = ?,
            url_placa_trasera = ?,
            requiere_renovacion = ?,
            monto_pago = ?,
            url_comprobante_pago = ?,
            url_tarjeta_circulacion = ?,
            id_unidad = ?
        WHERE id_placa = ?
    `;

    const values = [

        data.folio || null,
        data.placa,
        data.fecha_expedicion || null,
        data.fecha_vigencia || null,
        data.url_placa_frontal || null,
        data.url_placa_trasera || null,
        data.requiere_renovacion || 0,
        data.monto_pago,
        data.url_comprobante_pago || null,
        data.url_tarjeta_circulacion || null,
        data.id_unidad || null,
        id

    ];

    await pool.query(sql, values);

    return await findById(id);

};



/*
|--------------------------------------------------------------------------
| Cambiar status
|--------------------------------------------------------------------------
*/

const updateStatus = async (id, status) => {

    const sql = `
        UPDATE Placas
        SET status = ?
        WHERE id_placa = ?
    `;

    await pool.query(sql, [status, id]);

    return await findById(id);

};



export default {

    create,
    findAll,
    findById,
    findByPlaca,
    update,
    updateStatus

};