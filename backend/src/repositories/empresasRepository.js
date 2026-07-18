import pool from "../config/connection.js";


/*
|--------------------------------------------------------------------------
| Obtener todas las empresas
|--------------------------------------------------------------------------
*/

const findAll = async () => {

    const sql = `
        SELECT
            id_empresa,
            razon_social,
            rfc,
            regimen_fiscal,
            nombre_comercial,
            direccion,
            inicio_operaciones,
            estatus,
            actividad_economica

        FROM empresas

        ORDER BY id_empresa DESC
    `;


    const [rows] = await pool.execute(sql);

    return rows;

};



/*
|--------------------------------------------------------------------------
| Obtener empresa por ID
|--------------------------------------------------------------------------
*/

const findById = async (id_empresa) => {


    const sql = `
        SELECT
            id_empresa,
            razon_social,
            rfc,
            regimen_fiscal,
            nombre_comercial,
            direccion,
            inicio_operaciones,
            estatus,
            actividad_economica

        FROM empresas

        WHERE id_empresa = ?

        LIMIT 1
    `;


    const [rows] = await pool.execute(
        sql,
        [id_empresa]
    );


    return rows[0] || null;

};



/*
|--------------------------------------------------------------------------
| Crear empresa
|--------------------------------------------------------------------------
*/

const create = async (empresa) => {


    const {
        razon_social,
        rfc,
        regimen_fiscal,
        nombre_comercial,
        direccion,
        inicio_operaciones,
        actividad_economica
    } = empresa;



    const sql = `
        INSERT INTO empresas
        (
            razon_social,
            rfc,
            regimen_fiscal,
            nombre_comercial,
            direccion,
            inicio_operaciones,
            actividad_economica
        )

        VALUES
        (?, ?, ?, ?, ?, ?, ?)
    `;



    const [resultado] = await pool.execute(
        sql,
        [
            razon_social,
            rfc,
            regimen_fiscal,
            nombre_comercial,
            direccion,
            inicio_operaciones,
            actividad_economica
        ]
    );


    return resultado.insertId;

};



/*
|--------------------------------------------------------------------------
| Actualizar empresa
|--------------------------------------------------------------------------
*/

const update = async (
    id_empresa,
    empresa
) => {


    const {
        razon_social,
        rfc,
        regimen_fiscal,
        nombre_comercial,
        direccion,
        inicio_operaciones,
        actividad_economica
    } = empresa;



    const sql = `
        UPDATE empresas

        SET
            razon_social = ?,
            rfc = ?,
            regimen_fiscal = ?,
            nombre_comercial = ?,
            direccion = ?,
            inicio_operaciones = ?,
            actividad_economica = ?

        WHERE id_empresa = ?
    `;



    await pool.execute(
        sql,
        [
            razon_social,
            rfc,
            regimen_fiscal,
            nombre_comercial,
            direccion,
            inicio_operaciones,
            actividad_economica,
            id_empresa
        ]
    );

};



/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

const updateStatus = async (
    id_empresa,
    estatus
) => {


    const sql = `
        UPDATE empresas

        SET estatus = ?

        WHERE id_empresa = ?
    `;


    await pool.execute(
        sql,
        [
            estatus,
            id_empresa
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