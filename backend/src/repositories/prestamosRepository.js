import pool from "../config/connection.js";



/*
|--------------------------------------------------------------------------
| Crear préstamo
|--------------------------------------------------------------------------
*/

const create = async(data)=>{


    const sql = `

        INSERT INTO historial_prestamos
        (
            id_usuario,
            id_vehiculo,
            fecha_inicio,
            estado
        )

        VALUES (?, ?, ?, ?)

    `;



    const values=[

        data.id_usuario,
        data.id_vehiculo,
        data.fecha_inicio || new Date(),
        data.estado || "pendiente"

    ];



    const [result]=await pool.query(
        sql,
        values
    );



    return await findById(
        result.insertId
    );


};







/*
|--------------------------------------------------------------------------
| Obtener todos
|--------------------------------------------------------------------------
*/

const findAll = async()=>{


    const sql=`

        SELECT

            h.id_historial,

            h.fecha_inicio,
            h.fecha_fin,
            h.estado,
            h.firma_desasignacion,


            u.id_usuario,
            u.nombre AS usuario,


            un.id_unidad,
            un.cve,
            un.marca,
            un.modelo


        FROM historial_prestamos h


        INNER JOIN Usuarios u
        ON h.id_usuario=u.id_usuario


        INNER JOIN Unidades un
        ON h.id_vehiculo=un.id_unidad


        ORDER BY h.id_historial DESC

    `;



    const [rows]=await pool.query(sql);


    return rows;


};








/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

const findById = async(id)=>{


    const sql=`

        SELECT

            h.*,

            u.nombre AS usuario,


            un.cve,
            un.marca,
            un.modelo


        FROM historial_prestamos h


        INNER JOIN Usuarios u
        ON h.id_usuario=u.id_usuario


        INNER JOIN Unidades un
        ON h.id_vehiculo=un.id_unidad


        WHERE h.id_historial=?

    `;



    const [rows]=await pool.query(
        sql,
        [id]
    );



    return rows[0];


};









/*
|--------------------------------------------------------------------------
| Buscar préstamo activo por unidad
|--------------------------------------------------------------------------
*/

const findActiveByUnit=async(id_vehiculo)=>{


    const sql=`

        SELECT *

        FROM historial_prestamos

        WHERE id_vehiculo=?

        AND estado IN(
            'aprobado',
            'entregado'
        )


    `;



    const [rows]=await pool.query(
        sql,
        [id_vehiculo]
    );



    return rows[0];


};








/*
|--------------------------------------------------------------------------
| Actualizar préstamo
|--------------------------------------------------------------------------
*/

const update = async(id,data)=>{


    const sql=`

        UPDATE historial_prestamos

        SET

            id_usuario=?,
            id_vehiculo=?,
            fecha_inicio=?,
            fecha_fin=?,
            firma_desasignacion=?

        WHERE id_historial=?

    `;



    await pool.query(
        sql,
        [

            data.id_usuario,
            data.id_vehiculo,
            data.fecha_inicio,
            data.fecha_fin || null,
            data.firma_desasignacion || null,
            id

        ]
    );



    return await findById(id);


};









/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

const updateStatus=async(id,estado)=>{


    const sql=`

        UPDATE historial_prestamos

        SET estado=?

        WHERE id_historial=?

    `;



    await pool.query(
        sql,
        [
            estado,
            id
        ]
    );



    return await findById(id);


};


export default {


    create,
    findAll,
    findById,
    findActiveByUnit,
    update,
    updateStatus

};