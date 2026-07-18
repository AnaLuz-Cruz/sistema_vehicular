import pool from "../config/connection.js";

/*
|--------------------------------------------------------------------------
| Obtener conexión
|--------------------------------------------------------------------------
*/

const getDB = (connection) => connection || pool;


/*
|--------------------------------------------------------------------------
| Crear anomalía
|--------------------------------------------------------------------------
*/

const createAnomalia = async (connection, data) => {

    const db = getDB(connection);

    const sql = `

        INSERT INTO anomalias
        (

            id_ticket,
            id_solicitud,
            descripcion,
            notificado

        )

        VALUES
        (
            ?,?,?,?
        )

    `;

    const values = [

        data.id_ticket,
        data.id_solicitud,
        data.descripcion,
        data.notificado

    ];

    const [result] = await db.query(sql, values);

    return {

        id_anomalia: result.insertId

    };

};



/*
|--------------------------------------------------------------------------
| Crear alerta
|--------------------------------------------------------------------------
*/

const createAlerta = async (connection, data) => {

    const db = getDB(connection);

    const sql = `

        INSERT INTO Alertas
        (

            id_unidad,
            tipo_alerta,
            descripcion,
            estado,
            detalle

        )

        VALUES
        (
            ?,?,?,?,?
        )

    `;

    const values = [

        data.id_unidad,
        data.tipo_alerta,
        data.descripcion,
        data.estado,
        JSON.stringify(data.detalle)

    ];

    const [result] = await db.query(sql, values);

    return {

        id_alerta: result.insertId

    };

};



/*
|--------------------------------------------------------------------------
| Crear ticket de revisión
|--------------------------------------------------------------------------
*/

const createTicketAlerta = async (connection, data) => {

    const db = getDB(connection);

    const sql = `

        INSERT INTO tickets_alertas
        (

            id_consumo

        )

        VALUES
        (
            ?
        )

    `;

    const [result] = await db.query(sql, [

        data.id_consumo

    ]);

    return {

        id_ticket_alerta: result.insertId

    };

};



export default {

    createAnomalia,
    createAlerta,
    createTicketAlerta

};