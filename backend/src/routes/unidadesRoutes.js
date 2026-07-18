import { Router } from "express";


import {

    obtenerUnidades,
    obtenerUnidad,
    crearUnidad,
    actualizarUnidad,
    cambiarEstadoUnidad

} from "../controllers/unidadesController.js";


import verifyToken from "../middlewares/verifyToken.js";


import authorizeRoles from "../middlewares/authorizeRoles.js";



const router = Router();



/*
|--------------------------------------------------------------------------
| Unidades
|--------------------------------------------------------------------------
*/


// Obtener todas
router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerUnidades
);




// Obtener por ID
router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    obtenerUnidad
);




// Crear unidad
router.post(
    "/",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    crearUnidad
);


/*
|--------------------------------------------------------------------------
| Actualizar unidad
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    actualizarUnidad
);

/*
|--------------------------------------------------------------------------
| Cambiar estado unidad
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/estado",
    verifyToken,
    authorizeRoles(
        "Superusuario",
        "Administrador"
    ),
    cambiarEstadoUnidad
);

export default router;