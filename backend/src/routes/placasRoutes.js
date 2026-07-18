import { Router } from "express";
import placasController from "../controllers/placasController.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Crear placa
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    placasController.create
);

/*
|--------------------------------------------------------------------------
| Obtener todas las placas
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    placasController.findAll
);

/*
|--------------------------------------------------------------------------
| Obtener placa por ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    placasController.findById
);

/*
|--------------------------------------------------------------------------
| Actualizar placa
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    placasController.update
);

/*
|--------------------------------------------------------------------------
| Cambiar status
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/status",
    placasController.updateStatus
);

export default router;