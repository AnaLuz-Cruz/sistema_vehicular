import { Router } from "express";

import prestamosController from "../controllers/prestamosController.js";


const router = Router();



/*
|--------------------------------------------------------------------------
| Crear préstamo
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    prestamosController.create
);





/*
|--------------------------------------------------------------------------
| Obtener todos
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    prestamosController.findAll
);





/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    prestamosController.findById
);






/*
|--------------------------------------------------------------------------
| Actualizar
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    prestamosController.update
);






/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/status",
    prestamosController.updateStatus
);



export default router;