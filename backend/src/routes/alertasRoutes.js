import { Router } from "express";

import alertasController from "../controllers/alertasController.js";


const router = Router();



/*
|--------------------------------------------------------------------------|
| Obtener todas las alertas
|--------------------------------------------------------------------------|
*/

router.get(
    "/",
    alertasController.findAll
);



/*
|--------------------------------------------------------------------------|
| Obtener alerta por ID
|--------------------------------------------------------------------------|
*/

router.get(
    "/:id",
    alertasController.findById
);



/*
|--------------------------------------------------------------------------|
| Actualizar estado alerta
|--------------------------------------------------------------------------|
*/

router.patch(
    "/:id/status",
    alertasController.updateStatus
);



export default router;