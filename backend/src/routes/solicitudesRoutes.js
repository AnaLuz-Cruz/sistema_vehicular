import { Router } from "express";
import solicitudesController from "../controllers/solicitudesController.js";


const router = Router();

// Crear solicitud
router.post("/", solicitudesController.create);

// Obtener todas
router.get("/", solicitudesController.findAll);

// Obtener por ID
router.get("/:id", solicitudesController.findById);

// Actualizar estado
router.patch("/:id/status", solicitudesController.updateStatus);

export default router;

