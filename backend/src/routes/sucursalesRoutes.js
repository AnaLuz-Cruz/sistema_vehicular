import { Router } from "express";

import {
    obtenerSucursales,
    obtenerSucursal,
    crearSucursal,
    actualizarSucursal,
    actualizarEstadoSucursal
} from "../controllers/sucursalesController.js";


import verifyToken from "../middlewares/verifyToken.js";

import authorizeRoles from "../middlewares/authorizeRoles.js";


const router = Router();



/*
|--------------------------------------------------------------------------
| Sucursales
|--------------------------------------------------------------------------
*/


// Obtener todas las sucursales
router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerSucursales
);



// Obtener sucursal por ID
router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerSucursal
);



// Crear sucursal
router.post(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    crearSucursal
);



// Actualizar sucursal
router.put(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    actualizarSucursal
);



// Cambiar estado
router.patch(
    "/:id/estado",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    actualizarEstadoSucursal
);



export default router;