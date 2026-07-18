/**
 * Respuesta exitosa
 */
export const successResponse = (
    res,
    message,
    data = null,
    statusCode = 200
) => {

    return res.status(statusCode).json({
        success: true,
        message,
        data
    });

};


/**
 * Respuesta de error
 */
export const errorResponse = (
    res,
    message,
    statusCode = 500
) => {

    return res.status(statusCode).json({
        success: false,
        message
    });

};