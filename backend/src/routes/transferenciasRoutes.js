import { Router } from "express";

import transferenciasController from "../controllers/transferenciasController.js";


const router = Router();



/*
|--------------------------------------------------------------------------
| Crear gasolinera
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    transferenciasController.create
);




/*
|--------------------------------------------------------------------------
| Obtener todas
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    transferenciasController.findAll
);




/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    transferenciasController.findById
);




/*
|--------------------------------------------------------------------------
| Actualizar
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    transferenciasController.update
);



export default router;