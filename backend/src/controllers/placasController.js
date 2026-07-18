import placasService from "../services/placasService.js";


/*
|--------------------------------------------------------------------------
| Crear placa
|--------------------------------------------------------------------------
*/

const create = async (req, res) => {

    try {

        const placa = await placasService.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Placa registrada correctamente",
            data: placa
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
| Obtener todas las placas
|--------------------------------------------------------------------------
*/

const findAll = async (req, res) => {

    try {

        const placas = await placasService.findAll();

        return res.status(200).json({
            success: true,
            data: placas
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
| Obtener placa por ID
|--------------------------------------------------------------------------
*/

const findById = async (req, res) => {

    try {

        const { id } = req.params;

        const placa = await placasService.findById(id);

        return res.status(200).json({
            success: true,
            data: placa
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
| Actualizar placa
|--------------------------------------------------------------------------
*/

const update = async (req, res) => {

    try {

        const { id } = req.params;

        const placa = await placasService.update(id, req.body);

        return res.status(200).json({
            success: true,
            message: "Placa actualizada correctamente",
            data: placa
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

        const placa = await placasService.updateStatus(id, status);

        return res.status(200).json({
            success: true,
            message: "Estado actualizado correctamente",
            data: placa
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