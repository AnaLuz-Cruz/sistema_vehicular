import pool from "../config/connection.js";


/*
|--------------------------------------------------------------------------
| Crear asignación
|--------------------------------------------------------------------------
*/

const create = async (data) => {


    const sql = `

        INSERT INTO Asignaciones
        (
            id_usuario,
            id_unidad,
            fecha_asignacion,
            fecha_fin,
            status
        )

        VALUES (?, ?, ?, ?, ?)

    `;


    const values = [

        data.id_usuario || null,
        data.id_unidad,
        data.fecha_asignacion,
        data.fecha_fin || null,
        data.status || "activo"

    ];


    const [result] = await pool.query(sql, values);


    return {
        id_asignacion: result.insertId,
        ...data
    };

};


/*
|--------------------------------------------------------------------------
| Obtener todas las asignaciones
|--------------------------------------------------------------------------
*/

const findAll = async () => {


    const sql = `

        SELECT

            a.id_asignacion,

            a.fecha_asignacion,
            a.fecha_fin,
            a.status,


            u.id_usuario,
            u.nombre AS usuario,
            u.rol,


            un.id_unidad,
            un.cve,
            un.marca,
            un.modelo,


            s.nombre AS sucursal,
            e.nombre_comercial AS empresa


        FROM Asignaciones a


        LEFT JOIN Usuarios u
        ON a.id_usuario = u.id_usuario


        INNER JOIN Unidades un
        ON a.id_unidad = un.id_unidad


        INNER JOIN Sucursales s
        ON un.id_sucursal = s.id_sucursal

        LEFT JOIN Empresas e
        ON un.id_empresa = e.id_empresa        


        ORDER BY a.id_asignacion DESC

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


    const sql=`

        SELECT

            a.*,

            u.nombre AS usuario,
            u.correo,
            u.rol,


            un.cve,
            un.marca,
            un.modelo,


            s.nombre AS sucursal


        FROM Asignaciones a


        LEFT JOIN Usuarios u
        ON a.id_usuario = u.id_usuario


        INNER JOIN Unidades un
        ON a.id_unidad = un.id_unidad


        INNER JOIN Sucursales s
        ON un.id_sucursal=s.id_sucursal


        WHERE a.id_asignacion=?

    `;


    const [rows]=await pool.query(sql,[id]);


    return rows[0];

};

/*
|--------------------------------------------------------------------------
| Actualizar asignación
|--------------------------------------------------------------------------
*/

const update = async(id,data)=>{


    const sql=`

        UPDATE Asignaciones

        SET

            id_usuario=?,
            id_unidad=?,
            fecha_asignacion=?,
            fecha_fin=?

        WHERE id_asignacion=?

    `;



    const values=[

        data.id_usuario || null,
        data.id_unidad,
        data.fecha_asignacion,
        data.fecha_fin || null,
        id

    ];


    await pool.query(sql, values);

    return await findById(id);

};





/*
|--------------------------------------------------------------------------
| Cambiar status
|--------------------------------------------------------------------------
*/

const updateStatus=async(id,status)=>{


    const sql=`

        UPDATE Asignaciones

        SET status=?

        WHERE id_asignacion=?

    `;


    const [result]=await pool.query(
        sql,
        [
            status,
            id
        ]
    );

    await pool.query(sql, [status, id]);

    return await findById(id);        

    // return result.affectedRows > 0;

};


/*
|--------------------------------------------------------------------------
| Buscar asignación activa por unidad
|--------------------------------------------------------------------------
*/

const findActiveByUnit=async(id_unidad)=>{


    const sql=`

        SELECT *
        FROM Asignaciones
        WHERE id_unidad=?
        AND status='activo'
        LIMIT 1
    `;


    const [rows]=await pool.query(sql,[id_unidad]);


    return rows[0];

};




export default {

    create,
    findAll,
    findById,
    update,
    updateStatus,
    // findActiveByUser,
    findActiveByUnit

};