import pool from "../config/connection.js";



/*
|--------------------------------------------------------------------------
| Obtener todas las unidades
|--------------------------------------------------------------------------
*/

const findAll = async () => {


    const sql = `

        SELECT

            u.id_unidad,
            u.cve,
            u.marca,
            u.anio,
            u.version,
            u.tipo,
            u.clase,
            u.modelo,
            u.niv,
            u.motor,
            u.transmision,

            u.id_combustible,
            c.nombre AS combustible,

            u.color,
            u.telefono_gps,
            u.sim_gps,

            u.propietario,
            u.compra_arrendado,

            u.id_empresa,
            e.nombre_comercial AS empresa,

            u.id_sucursal,
            s.nombre AS sucursal,

            u.kilometraje_actual,
            u.litros_actuales,
            u.capacidad_tanque,

            u.es_utilitario,
            u.estado,
            u.fecha_registro


        FROM Unidades u

        LEFT JOIN combustible c
            ON u.id_combustible = c.id_combustible

        LEFT JOIN empresas e
            ON u.id_empresa = e.id_empresa

        LEFT JOIN Sucursales s
            ON u.id_sucursal = s.id_sucursal


        ORDER BY u.id_unidad DESC

    `;



    const [rows] =
        await pool.execute(sql);



    return rows;

};





/*
|--------------------------------------------------------------------------
| Obtener unidad por ID
|--------------------------------------------------------------------------
*/

const findById = async(id_unidad)=>{


    const sql = `

        SELECT *

        FROM Unidades

        WHERE id_unidad = ?

        LIMIT 1

    `;



    const [rows] =
        await pool.execute(
            sql,
            [id_unidad]
        );



    return rows[0] || null;

};





/*
|--------------------------------------------------------------------------
| Buscar placas/cve/niv repetidos
|--------------------------------------------------------------------------
*/

const findDuplicate = async(valor)=>{


    const sql = `

        SELECT id_unidad

        FROM Unidades

        WHERE cve = ?
        OR niv = ?

        LIMIT 1

    `;



    const [rows] =
        await pool.execute(
            sql,
            [
                valor,
                valor
            ]
        );


    return rows[0] || null;

};





/*
|--------------------------------------------------------------------------
| Crear unidad
|--------------------------------------------------------------------------
*/

const create = async (unidad) => {


    const sql = `

        INSERT INTO Unidades
        (
            cve,
            marca,
            anio,
            version,
            tipo,
            clase,
            modelo,
            niv,
            motor,
            transmision,
            id_combustible,
            color,
            telefono_gps,
            sim_gps,
            uid,
            propietario,
            compra_arrendado,
            id_empresa,
            id_sucursal,
            fecha_adquisicion,
            kilometraje_actual,
            litros_actuales,
            capacidad_tanque,
            kilometraje_por_litro,
            id_credito,
            es_utilitario
        )

        VALUES
        (
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?
        )

    `;



    const [resultado] = await pool.execute(
        sql,
        [

            unidad.cve ?? null,
            unidad.marca ?? null,
            unidad.anio ?? null,
            unidad.version ?? null,
            unidad.tipo ?? null,
            unidad.clase ?? null,
            unidad.modelo ?? null,
            unidad.niv ?? null,
            unidad.motor ?? null,
            unidad.transmision ?? null,

            unidad.id_combustible,

            unidad.color ?? null,
            unidad.telefono_gps ?? null,
            unidad.sim_gps ?? null,
            unidad.uid ?? null,

            unidad.propietario ?? null,
            unidad.compra_arrendado ?? null,

            unidad.id_empresa ?? null,
            unidad.id_sucursal ?? null,

            unidad.fecha_adquisicion ?? null,

            unidad.kilometraje_actual ?? 0,
            unidad.litros_actuales ?? 0,

            unidad.capacidad_tanque ?? 0,

            unidad.kilometraje_por_litro ?? null,

            unidad.id_credito ?? null,

            unidad.es_utilitario ?? "No Utilitario"

        ]
    );



    return resultado.insertId;

};

/*
|--------------------------------------------------------------------------
| Actualizar unidad
|--------------------------------------------------------------------------
*/

const update = async (
    id_unidad,
    unidad
) => {


    const sql = `

        UPDATE Unidades

        SET

            marca = ?,
            anio = ?,
            version = ?,
            tipo = ?,
            clase = ?,
            modelo = ?,
            id_combustible = ?,
            color = ?,
            id_empresa = ?,
            id_sucursal = ?,
            capacidad_tanque = ?,
            es_utilitario = ?

        WHERE id_unidad = ?

    `;



    await pool.execute(
        sql,
        [

            unidad.marca,
            unidad.anio,
            unidad.version,
            unidad.tipo,
            unidad.clase,
            unidad.modelo,
            unidad.id_combustible,
            unidad.color,
            unidad.id_empresa ?? null,
            unidad.id_sucursal ?? null,
            unidad.capacidad_tanque ?? 0,
            unidad.es_utilitario ?? "No Utilitario",

            id_unidad

        ]
    );


};





/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

const updateStatus = async(
    id_unidad,
    estado
)=>{


    const sql = `

        UPDATE Unidades

        SET estado = ?

        WHERE id_unidad = ?

    `;



    await pool.execute(
        sql,
        [
            estado,
            id_unidad
        ]
    );


};



export {

    findAll,
    findById,
    findDuplicate,
    create,
    update,
    updateStatus

};