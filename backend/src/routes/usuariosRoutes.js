import { Router } from "express";

import {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    cambiarEstadoUsuario
} from "../controllers/usuariosController.js";

import verifyToken from "../middlewares/verifyToken.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";


const router = Router();



/*
|--------------------------------------------------------------------------
| Usuarios
|--------------------------------------------------------------------------
*/


// Obtener todos
router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerUsuarios
);



// Obtener uno
router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerUsuario
);



// Crear
router.post(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    crearUsuario
);



// Actualizar
router.put(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    actualizarUsuario
);



// Cambiar estado
router.patch(
    "/:id/estado",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    cambiarEstadoUsuario
);



export default router;