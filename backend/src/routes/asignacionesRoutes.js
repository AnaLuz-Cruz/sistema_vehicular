import { Router } from "express";

import asignacionesController from "../controllers/asignacionesController.js";


const router = Router();



/*
|--------------------------------------------------------------------------
| Crear asignación
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    asignacionesController.create
);




/*
|--------------------------------------------------------------------------
| Obtener todas las asignaciones
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    asignacionesController.findAll
);




/*
|--------------------------------------------------------------------------
| Obtener asignación por ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    asignacionesController.findById
);




/*
|--------------------------------------------------------------------------
| Actualizar asignación
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    asignacionesController.update
);




/*
|--------------------------------------------------------------------------
| Actualizar status
|--------------------------------------------------------------------------
*/

router.patch("/:id/status", asignacionesController.updateStatus);



export default router;