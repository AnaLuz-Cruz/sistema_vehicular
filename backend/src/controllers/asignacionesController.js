import asignacionesService from "../services/asignacionesService.js";

/*
|--------------------------------------------------------------------------
| Crear asignación
|--------------------------------------------------------------------------
*/
const create = async (req, res) => {
    try {
        const asignacion = await asignacionesService.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Asignación creada correctamente",
            data: asignacion
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/*
|--------------------------------------------------------------------------
| Obtener todas las asignaciones
|--------------------------------------------------------------------------
*/
const findAll = async (req, res) => {
    try {
        const asignaciones = await asignacionesService.findAll();
        return res.status(200).json({
            success: true,
            data: asignaciones
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/*
|--------------------------------------------------------------------------
| Obtener asignación por ID
|--------------------------------------------------------------------------
*/
const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const asignacion = await asignacionesService.findById(id);
        return res.status(200).json({
            success: true,
            data: asignacion
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/*
|--------------------------------------------------------------------------
| Actualizar asignación
|--------------------------------------------------------------------------
*/
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await asignacionesService.update(id, req.body);
        return res.status(200).json({
            success: true,
            message: "Asignación actualizada correctamente",
            data: resultado
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/*
|--------------------------------------------------------------------------
| Cambiar status
|--------------------------------------------------------------------------
*/
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const resultado = await asignacionesService.updateStatus(id, status);
        return res.status(200).json({
            success: true,
            message: "Estado actualizado correctamente",
            data: resultado
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export default {
    create,
    findAll,
    findById,
    update,
    updateStatus
};