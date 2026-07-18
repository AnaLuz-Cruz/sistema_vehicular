import pool from "../config/connection.js";


    const create = async(data)=>{


    const sql=`

    INSERT INTO notificaciones
    (
    id_usuario,
    id_solicitud,
    mensaje
    )

    VALUES
    (?,?,?)

    `;


    const [result]=await pool.query(
    sql,
    [
    data.id_usuario,
    data.id_solicitud,
    data.mensaje
    ]
    );


    return {

    id_notificacion:
    result.insertId

    };


    };



    export default {

    create

    };