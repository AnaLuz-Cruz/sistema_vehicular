import pool from "../config/connection.js";
import ticketsRepository from "../repositories/ticketsRepository.js";
import alertasService from "./alertasService.js";

const create = async (data) => {
    // 1. Obtener conexión del pool para la transacción
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        /*
        |--------------------------------------------------------------------------
        | Búsqueda y Validaciones (se mantienen igual)
        |--------------------------------------------------------------------------
        */
        const datosSolicitud = await ticketsRepository.findSolicitud(connection, data.id_solicitud);

        if (!datosSolicitud) throw new Error("La solicitud no existe.");
        if (datosSolicitud.estado !== "Aprobada") throw new Error("La solicitud debe estar aprobada.");

        const ticketExistente = await ticketsRepository.findBySolicitud(connection, data.id_solicitud);
        if (ticketExistente) throw new Error("La solicitud ya tiene un ticket registrado.");

        if (Number(data.litros_cargados) <= 0) throw new Error("Debe indicar los litros cargados.");
        if (Number(data.litros_cargados) > Number(datosSolicitud.litros_solicitados)) {
            throw new Error("Los litros cargados superan los litros autorizados.");
        }

        const litrosFinales = Number(datosSolicitud.litros_actuales ?? 0) + Number(data.litros_cargados);
        if (litrosFinales > Number(datosSolicitud.capacidad_tanque)) {
            throw new Error("Los litros cargados superan la capacidad del tanque.");
        }

        if (Number(data.precio_por_litro) <= 0) throw new Error("El precio por litro es inválido.");
        if (Number(data.km_final) <= Number(datosSolicitud.km_actual)) {
            throw new Error("El kilometraje final debe ser mayor al registrado en la solicitud.");
        }

        if (!data.numero_ticket || data.numero_ticket.trim() === "") throw new Error("Debe indicar el número del ticket.");
        const ticketNumero = await ticketsRepository.findByNumeroTicket(connection, data.numero_ticket);
        if (ticketNumero) throw new Error("El número de ticket ya existe.");

        if (data.litros_final_tablero === undefined || data.litros_final_tablero === null || Number(data.litros_final_tablero) < 0) {
            throw new Error("Los litros finales registrados en el tablero son inválidos.");
        }

        // Cálculos
        const montoTotal = Number(data.litros_cargados) * Number(data.precio_por_litro);
        const litrosFinalTeorico = Number(datosSolicitud.litros_actuales ?? 0) + Number(data.litros_cargados);
        const litrosFinalUsuario = Number(data.litros_final_tablero);
        const litrosGastados = litrosFinalTeorico - litrosFinalUsuario;

        if (litrosGastados < 0) throw new Error("Los litros registrados en tablero no pueden superar los litros disponibles.");

        const kmRecorridos = Number(data.km_final) - Number(datosSolicitud.km_actual);
        // const rendimiento = litrosGastados > 0 ? Number(kmRecorridos) / Number(litrosGastados) : 0;
        const rendimiento =

            Number(data.litros_cargados) > 0

            ?

            Number(kmRecorridos) / Number(data.litros_cargados)

            :

            0;

        /*
        |--------------------------------------------------------------------------
        | Operaciones de BD (Pasando la conexión)
        |--------------------------------------------------------------------------
        */

        // 1. Crear ticket
        const ticket = await ticketsRepository.create(connection, {
            id_solicitud: data.id_solicitud,
            numero_ticket: data.numero_ticket,
            fecha_compra: data.fecha_compra,
            monto_total: montoTotal,
            foto_ticket: data.foto_ticket,
            foto_tablero_final: data.foto_tablero_final,
            litros_cargados: data.litros_cargados,
            precio_por_litro: data.precio_por_litro
        });

        // 2. Crear consumo
        const consumo = await ticketsRepository.createConsumo(connection, {
            id_solicitud: data.id_solicitud,
            id_unidad: datosSolicitud.id_vehiculo,
            id_usuario: datosSolicitud.id_usuario,
            litros_iniciales: datosSolicitud.litros_actuales,
            litros_final_usuario: litrosFinalUsuario,
            litros_final_teorico: litrosFinalTeorico,
            litros_gastados: litrosGastados,
            rendimiento_kmxl: rendimiento,
            km_recorridos: kmRecorridos
        });

        // 3. Verificar alertas (usando la misma conexión)
        await alertasService.verificarConsumo(connection, {
            id_ticket: ticket.id_ticket,
            id_consumo: consumo.id_consumo,
            id_solicitud: data.id_solicitud,
            id_unidad: datosSolicitud.id_vehiculo,
            diferencia: litrosGastados,
            rendimiento: rendimiento
        });

        // 4. Actualizar unidad
        await ticketsRepository.updateUnidad(connection, {
            id_unidad: datosSolicitud.id_vehiculo,
            km_final: data.km_final,
            litros_nuevos: litrosFinalTeorico
        });

        // 5. Finalizar solicitud
        await ticketsRepository.finalizarSolicitud(connection, data.id_solicitud);

        // Confirmar todo
        await connection.commit();
        return ticket;

    } catch (error) {
        // Revertir en caso de error
        await connection.rollback();
        throw error;
    } finally {
        // Liberar la conexión
        connection.release();
    }
};

export default { create };