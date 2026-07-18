const notFound = (req, res) => {
    return res.status(404).json({
        success: false,
        message: `La ruta '${req.originalUrl}' no existe.`
    });
};

export default notFound;