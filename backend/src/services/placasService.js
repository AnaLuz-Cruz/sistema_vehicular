import placasRepository from "../repositories/placasRepository.js";
import pool from "../config/connection.js";

/*
|--------------------------------------------------------------------------
| Crear placa
|--------------------------------------------------------------------------
*/

const create = async (data) => {

    // Validar datos obligatorios
    if (!data.placa) {
        throw new Error("La placa es obligatoria");
    }

    if (data.monto_pago == null || data.monto_pago < 0) {
        throw new Error("El monto de pago debe ser mayor o igual a 0");
    }

    // Validar que la placa no exista
    const placaExiste = await placasRepository.findByPlaca(data.placa);

    if (placaExiste) {
        throw new Error("La placa ya está registrada");
    }

    // Validar fechas
    if (
        data.fecha_expedicion &&
        data.fecha_vigencia &&
        new Date(data.fecha_vigencia) < new Date(data.fecha_expedicion)
    ) {
        throw new Error(
            "La fecha de vigencia no puede ser menor que la fecha de expedición"
        );
    }

    // Validar unidad
    if (data.id_unidad) {

        const [unidad] = await pool.query(
            `
            SELECT id_unidad
            FROM Unidades
            WHERE id_unidad = ?
            `,
            [data.id_unidad]
        );

        if (unidad.length === 0) {
            throw new Error("La unidad no existe");
        }
    }

    return await placasRepository.create(data);

};



/*
|--------------------------------------------------------------------------
| Obtener todas
|--------------------------------------------------------------------------
*/

const findAll = async () => {

    return await placasRepository.findAll();

};



/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

const findById = async (id) => {

    const placa = await placasRepository.findById(id);

    if (!placa) {
        throw new Error("La placa no existe");
    }

    return placa;

};



/*
|--------------------------------------------------------------------------
| Actualizar
|--------------------------------------------------------------------------
*/

const update = async (id, data) => {

    const placa = await placasRepository.findById(id);

    if (!placa) {
        throw new Error("La placa no existe");
    }

    // Validar placa repetida
    const placaExiste = await placasRepository.findByPlaca(data.placa);

    if (
        placaExiste &&
        placaExiste.id_placa !== Number(id)
    ) {
        throw new Error("La placa ya está registrada");
    }

    // Validar monto
    if (data.monto_pago < 0) {
        throw new Error("El monto de pago no puede ser negativo");
    }

    // Validar fechas
    if (
        data.fecha_expedicion &&
        data.fecha_vigencia &&
        new Date(data.fecha_vigencia) < new Date(data.fecha_expedicion)
    ) {
        throw new Error(
            "La fecha de vigencia no puede ser menor que la fecha de expedición"
        );
    }

    // Validar unidad
    if (data.id_unidad) {

        const [unidad] = await pool.query(
            `
            SELECT id_unidad
            FROM Unidades
            WHERE id_unidad = ?
            `,
            [data.id_unidad]
        );

        if (unidad.length === 0) {
            throw new Error("La unidad no existe");
        }

    }

    return await placasRepository.update(id, data);

};



/*
|--------------------------------------------------------------------------
| Cambiar status
|--------------------------------------------------------------------------
*/

const updateStatus = async (id, status) => {

    const estadosValidos = [
        "activa",
        "vencida",
        "cancelada"
    ];

    if (!estadosValidos.includes(status)) {
        throw new Error("Status inválido");
    }

    const placa = await placasRepository.findById(id);

    if (!placa) {
        throw new Error("La placa no existe");
    }

    return await placasRepository.updateStatus(id, status);

};



export default {

    create,
    findAll,
    findById,
    update,
    updateStatus

};