import pool from "../config/connection.js";


/*
|--------------------------------------------------------------------------
| Crear transferencia
|--------------------------------------------------------------------------
*/

const create = async(data)=>{


    const sql = `

        INSERT INTO transferencia_gasolineras
        (
            nombre_gasolinera
        )

        VALUES (?)

    `;


    const [result] = await pool.query(
        sql,
        [
            data.nombre_gasolinera
        ]
    );


    return await findById(result.insertId);


};





/*
|--------------------------------------------------------------------------
| Obtener todas
|--------------------------------------------------------------------------
*/

const findAll = async()=>{


    const sql = `

        SELECT *

        FROM transferencia_gasolineras

        ORDER BY id_transferencia DESC

    `;


    const [rows] = await pool.query(sql);


    return rows;


};





/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

const findById = async(id)=>{


    const sql = `

        SELECT *

        FROM transferencia_gasolineras

        WHERE id_transferencia=?

    `;


    const [rows] = await pool.query(
        sql,
        [id]
    );


    return rows[0];


};






/*
|--------------------------------------------------------------------------
| Buscar por nombre
|--------------------------------------------------------------------------
*/

const findByNombre = async(nombre)=>{


    const sql = `

        SELECT *

        FROM transferencia_gasolineras

        WHERE nombre_gasolinera=?

    `;


    const [rows] = await pool.query(
        sql,
        [nombre]
    );


    return rows[0];


};







/*
|--------------------------------------------------------------------------
| Actualizar
|--------------------------------------------------------------------------
*/

const update = async(id,data)=>{


    const sql = `

        UPDATE transferencia_gasolineras

        SET nombre_gasolinera=?

        WHERE id_transferencia=?

    `;


    await pool.query(
        sql,
        [
            data.nombre_gasolinera,
            id
        ]
    );


    return await findById(id);


};

export default {

    create,
    findAll,
    findById,
    findByNombre,
    update

};