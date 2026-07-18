import { Router } from "express";

import creditosController from "../controllers/creditosController.js";


const router = Router();



/*
|--------------------------------------------------------------------------
| Crear crédito
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    creditosController.create
);




/*
|--------------------------------------------------------------------------
| Obtener todos
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    creditosController.findAll
);




/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    creditosController.findById
);




/*
|--------------------------------------------------------------------------
| Actualizar
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    creditosController.update
);




/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/status",
    creditosController.updateStatus
);



export default router;