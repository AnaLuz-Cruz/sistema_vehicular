import pool from "../config/connection.js";


/*
|--------------------------------------------------------------------------
| Obtener todas las áreas
|--------------------------------------------------------------------------
*/

const findAll = async () => {


    const sql = `
        SELECT
            id_area,
            nombre

        FROM areas

        ORDER BY id_area DESC
    `;


    const [rows] = await pool.execute(sql);


    return rows;

};



/*
|--------------------------------------------------------------------------
| Obtener área por ID
|--------------------------------------------------------------------------
*/

const findById = async (id_area) => {


    const sql = `
        SELECT
            id_area,
            nombre

        FROM areas

        WHERE id_area = ?

        LIMIT 1
    `;


    const [rows] = await pool.execute(
        sql,
        [id_area]
    );


    return rows[0] || null;

};




/*
|--------------------------------------------------------------------------
| Crear área
|--------------------------------------------------------------------------
*/

const create = async (area) => {


    const {
        nombre
    } = area;



    const sql = `
        INSERT INTO areas
        (
            nombre
        )

        VALUES
        (?)
    `;



    const [resultado] = await pool.execute(
        sql,
        [
            nombre
        ]
    );


    return resultado.insertId;

};




/*
|--------------------------------------------------------------------------
| Actualizar área
|--------------------------------------------------------------------------
*/

const update = async (
    id_area,
    area
) => {


    const sql = `
        UPDATE areas

        SET nombre = ?

        WHERE id_area = ?
    `;


    await pool.execute(
        sql,
        [
            area.nombre,
            id_area
        ]
    );

};




/*
|--------------------------------------------------------------------------
| Eliminar área
|--------------------------------------------------------------------------
*/

const remove = async (id_area) => {


    const sql = `
        DELETE FROM areas

        WHERE id_area = ?
    `;


    await pool.execute(
        sql,
        [
            id_area
        ]
    );

};



export {
    findAll,
    findById,
    create,
    update,
    remove
};