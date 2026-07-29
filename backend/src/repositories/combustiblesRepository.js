import pool from "../config/connection.js";

const findAll = async () => {

    const sql = `
        SELECT

            id_combustible,
            nombre

        FROM combustible

        ORDER BY nombre
    `;

    const [rows] =
        await pool.execute(sql);

    return rows;

};

export {
    findAll
};