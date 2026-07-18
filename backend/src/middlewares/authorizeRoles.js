const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado."
            });

        }

        if (!roles.includes(req.user.rol)) {

            return res.status(403).json({
                success: false,
                message: "No tiene permisos para acceder a este recurso."
            });

        }

        next();

    };

};

export default authorizeRoles;