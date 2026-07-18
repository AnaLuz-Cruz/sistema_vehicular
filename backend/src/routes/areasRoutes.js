import { Router } from "express";


import {

    obtenerAreas,
    obtenerArea,
    crearArea,
    actualizarArea,
    eliminarArea

} from "../controllers/areasController.js";


import verifyToken from "../middlewares/verifyToken.js";


import authorizeRoles from "../middlewares/authorizeRoles.js";



const router = Router();



/*
|--------------------------------------------------------------------------
| Áreas
|--------------------------------------------------------------------------
*/


router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerAreas
);



router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerArea
);



router.post(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    crearArea
);



router.put(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    actualizarArea
);



router.delete(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    eliminarArea
);



export default router;