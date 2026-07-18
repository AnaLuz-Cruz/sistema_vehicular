import { Router } from "express";
import ticketsController from "../controllers/ticketsController.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Crear Ticket
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    ticketsController.create
);

export default router;