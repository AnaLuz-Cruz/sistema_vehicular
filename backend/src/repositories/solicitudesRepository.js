import pool from "../config/connection.js";



/*
|--------------------------------------------------------------------------
| Crear solicitud
|--------------------------------------------------------------------------
*/

const create = async(data)=>{


    const sql = `

        INSERT INTO solicitudes
        (
            id_usuario,
            id_vehiculo,
            km_actual,
            litros_solicitados,
            id_combustible,
            id_metodo,
            observaciones,
            id_credito,
            litros_actuales,
            id_transferencia,
            nombre_gasolinera,
            id_actividad,
            foto_tablero,
            foto_anticongelante,
            foto_balloneta,
            foto_frenos,
            foto_motor
        )

        VALUES
        (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
        )

    `;



    const values = [

        data.id_usuario,
        data.id_vehiculo,
        data.km_actual,
        data.litros_solicitados,
        data.id_combustible,
        data.id_metodo || null,
        data.observaciones || null,
        data.id_credito || null,
        data.litros_actuales || null,
        data.id_transferencia || null,
        data.nombre_gasolinera || null,
        data.id_actividad || null,
        data.foto_tablero || null,
        data.foto_anticongelante || null,
        data.foto_balloneta || null,
        data.foto_frenos || null,
        data.foto_motor || null

    ];



    const [result] = await pool.query(
        sql,
        values
    );



    return {

        id_solicitud: result.insertId,
        ...data

    };


};






/*
|--------------------------------------------------------------------------
| Obtener todas las solicitudes
|--------------------------------------------------------------------------
*/

const findAll = async()=>{


    const sql = `

        SELECT

            s.id_solicitud,
            s.fecha_solicitud,
            s.km_actual,
            s.litros_solicitados,
            s.estado,
            s.observaciones,


            u.nombre AS usuario,


            un.cve,
            un.marca,
            un.modelo,


            c.nombre AS combustible,


            mp.nombre AS metodo_pago,


            a.nombre AS actividad


        FROM solicitudes s


        INNER JOIN Usuarios u
        ON s.id_usuario = u.id_usuario


        INNER JOIN Unidades un
        ON s.id_vehiculo = un.id_unidad


        INNER JOIN combustible c
        ON s.id_combustible = c.id_combustible


        LEFT JOIN metodos_pago mp
        ON s.id_metodo = mp.id_metodo


        LEFT JOIN actividad a
        ON s.id_actividad = a.id_actividad


        ORDER BY s.id_solicitud DESC

    `;



    const [rows] = await pool.query(sql);


    return rows;


};








/*
|--------------------------------------------------------------------------
| Obtener solicitud por ID
|--------------------------------------------------------------------------
*/

const findById = async(id)=>{


    const sql = `

        SELECT

            s.*,


            u.nombre AS usuario,
            u.correo,


            un.cve,
            un.marca,
            un.modelo,
            un.capacidad_tanque,
            un.kilometraje_actual,


            e.razon_social AS empresa,


            suc.nombre AS sucursal,


            p.placa,


            c.nombre AS combustible,


            mp.nombre AS metodo_pago,


            a.nombre AS actividad


        FROM solicitudes s


        INNER JOIN Usuarios u
        ON s.id_usuario=u.id_usuario


        INNER JOIN Unidades un
        ON s.id_vehiculo=un.id_unidad


        INNER JOIN empresas e
        ON un.id_empresa=e.id_empresa


        INNER JOIN Sucursales suc
        ON un.id_sucursal=suc.id_sucursal


        LEFT JOIN Placas p
        ON un.id_unidad=p.id_unidad


        INNER JOIN combustible c
        ON s.id_combustible=c.id_combustible


        LEFT JOIN metodos_pago mp
        ON s.id_metodo=mp.id_metodo


        LEFT JOIN actividad a
        ON s.id_actividad=a.id_actividad


        WHERE s.id_solicitud=?


    `;



    const [rows]=await pool.query(
        sql,
        [id]
    );


    return rows[0];


};

/*
|--------------------------------------------------------------------------
| Actualizar estado
|--------------------------------------------------------------------------
*/

    const updateStatus = async(
        id,
        estado,
        motivo_rechazo
    )=>{


    const sql = `

        UPDATE solicitudes

        SET estado=?,
        motivo_rechazo=?

        WHERE id_solicitud=?

    `;



    const [result]=await pool.query(
        sql,
        [
            estado,

            estado === "Rechazada" ?
            motivo_rechazo : null,
            
            id
        ]
    );



    return result.affectedRows > 0;


};

export default {


    create,
    findAll,
    findById,
    updateStatus

};