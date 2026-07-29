import { Router } from "express";

import { obtenerCombustibles } from "../controllers/combustiblesController.js";

import verifyToken from "../middlewares/verifyToken.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = Router();

router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerCombustibles
);

export default router;