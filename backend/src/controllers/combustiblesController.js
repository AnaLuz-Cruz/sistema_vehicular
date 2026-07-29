import { getCombustibles } from "../services/combustiblesService.js";

import {
    successResponse,
    errorResponse
} from "../utils/response.js";

const obtenerCombustibles = async (req, res) => {

    try {

        const combustibles =
            await getCombustibles();

        return successResponse(
            res,
            "Combustibles obtenidos correctamente.",
            combustibles
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );

    }

};

export {
    obtenerCombustibles
};