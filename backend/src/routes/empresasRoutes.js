import { Router } from "express";


import {
    obtenerEmpresas,
    obtenerEmpresa,
    crearEmpresa,
    actualizarEmpresa,
    actualizarEstadoEmpresa
} from "../controllers/empresasController.js";


import verifyToken from "../middlewares/verifyToken.js";


import authorizeRoles from "../middlewares/authorizeRoles.js";



const router = Router();



/*
|--------------------------------------------------------------------------
| Empresas
|--------------------------------------------------------------------------
*/


router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerEmpresas
);



router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerEmpresa
);



router.post(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    crearEmpresa
);



router.put(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    actualizarEmpresa
);



router.patch(
    "/:id/estado",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    actualizarEstadoEmpresa
);



export default router;