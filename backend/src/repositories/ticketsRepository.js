import pool from "../config/connection.js";

/*
|--------------------------------------------------------------------------
| Obtener conexión
|--------------------------------------------------------------------------
*/

const getDB = (connection) => connection || pool;


/*
|--------------------------------------------------------------------------
| Buscar solicitud
|--------------------------------------------------------------------------
*/

const findSolicitud = async (connection, id) => {

    const db = getDB(connection);

    const sql = `

        SELECT

            s.*,
            u.capacidad_tanque

        FROM solicitudes s

        INNER JOIN Unidades u
            ON s.id_vehiculo = u.id_unidad

        WHERE s.id_solicitud = ?

    `;

    const [rows] = await db.query(sql, [id]);

    return rows[0];

};



/*
|--------------------------------------------------------------------------
| Buscar ticket por solicitud
|--------------------------------------------------------------------------
*/

const findBySolicitud = async (connection, idSolicitud) => {

    const db = getDB(connection);

    const sql = `

        SELECT
            id_ticket

        FROM tickets

        WHERE id_solicitud = ?

    `;

    const [rows] = await db.query(sql, [idSolicitud]);

    return rows[0];

};



/*
|--------------------------------------------------------------------------
| Buscar número de ticket
|--------------------------------------------------------------------------
*/

const findByNumeroTicket = async (connection, numeroTicket) => {

    const db = getDB(connection);

    const sql = `

        SELECT
            id_ticket

        FROM tickets

        WHERE numero_ticket = ?

    `;

    const [rows] = await db.query(sql, [numeroTicket]);

    return rows[0];

};



/*
|--------------------------------------------------------------------------
| Crear ticket
|--------------------------------------------------------------------------
*/

const create = async (connection, data) => {

    const db = getDB(connection);

    const sql = `

        INSERT INTO tickets
        (

            id_solicitud,
            numero_ticket,
            fecha_compra,
            monto_total,
            foto_ticket,
            foto_tablero_final,
            litros_cargados,
            precio_por_litro

        )

        VALUES
        (
            ?,?,?,?,?,?,?,?
        )

    `;

    const values = [

        data.id_solicitud,
        data.numero_ticket,
        data.fecha_compra,
        data.monto_total,
        data.foto_ticket,
        data.foto_tablero_final,
        data.litros_cargados,
        data.precio_por_litro

    ];

    const [result] = await db.query(sql, values);

    return {

        id_ticket: result.insertId,

        ...data

    };

};



/*
|--------------------------------------------------------------------------
| Actualizar unidad
|--------------------------------------------------------------------------
*/

const updateUnidad = async (connection, data) => {

    const db = getDB(connection);

    const sql = `

        UPDATE Unidades

        SET

            kilometraje_actual = ?,
            litros_actuales = ?

        WHERE id_unidad = ?

    `;

    const values = [

        data.km_final,
        data.litros_nuevos,
        data.id_unidad

    ];

    const [result] = await db.query(sql, values);

    return result.affectedRows > 0;

};



/*
|--------------------------------------------------------------------------
| Finalizar solicitud
|--------------------------------------------------------------------------
*/

const finalizarSolicitud = async (connection, id) => {

    const db = getDB(connection);

    const sql = `

        UPDATE solicitudes

        SET estado='Finalizado'

        WHERE id_solicitud = ?

    `;

    const [result] = await db.query(sql, [id]);

    return result.affectedRows > 0;

};



/*
|--------------------------------------------------------------------------
| Crear consumo
|--------------------------------------------------------------------------
*/

const createConsumo = async (connection, data) => {

    const db = getDB(connection);

    const sql = `

        INSERT INTO consumos
        (

            id_solicitud,
            id_unidad,
            id_usuario,
            litros_iniciales,
            litros_final_usuario,
            litros_final_teorico,
            litros_gastados,
            rendimiento_kmxl,
            km_recorridos

        )

        VALUES

        (?,?,?,?,?,?,?,?,?)

    `;

    const values = [

        data.id_solicitud,
        data.id_unidad,
        data.id_usuario,
        data.litros_iniciales,
        data.litros_final_usuario,
        data.litros_final_teorico,
        data.litros_gastados,
        data.rendimiento_kmxl,
        data.km_recorridos

    ];

    const [result] = await db.query(sql, values);

    return {

        id_consumo: result.insertId

    };

};


/*
|--------------------------------------------------------------------------
| Obtener historial de rendimiento de unidad
|--------------------------------------------------------------------------
*/

const getPromedioRendimientoUnidad = async (connection, idUnidad) => {

    const db = getDB(connection);


    const sql = `

        SELECT

            AVG(rendimiento_kmxl) AS promedio

        FROM
        (

            SELECT

                rendimiento_kmxl

            FROM consumos

            WHERE id_unidad = ?

            AND rendimiento_kmxl > 0

            ORDER BY fecha DESC

            LIMIT 5

        ) AS ultimos_consumos

    `;


    const [rows] = await db.query(
        sql,
        [idUnidad]
    );


    return Number(rows[0].promedio || 0);

};


export default {

    findSolicitud,
    findBySolicitud,
    findByNumeroTicket,
    create,
    updateUnidad,
    finalizarSolicitud,
    createConsumo,
    getPromedioRendimientoUnidad

};

