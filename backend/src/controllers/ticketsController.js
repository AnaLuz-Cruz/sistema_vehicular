import ticketsService from "../services/ticketsService.js";

/*
|--------------------------------------------------------------------------
| Crear Ticket
|--------------------------------------------------------------------------
*/

const create = async (req, res) => {

    try {

        const ticket = await ticketsService.create(req.body);

        return res.status(201).json({

            success: true,

            message: "Ticket registrado correctamente.",

            data: ticket

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

export default {

    create

};