import { Router } from "express";
import authRoutes from "./authRoutes.js";
import usuariosRoutes from "./usuariosRoutes.js";
import empresasRoutes from "./empresasRoutes.js";
import sucursalesRoutes from "./sucursalesRoutes.js";
import areasRoutes from "./areasRoutes.js";
import unidadesRoutes from "./unidadesRoutes.js";
import asignacionesRoutes from "./asignacionesRoutes.js";
import placasRoutes from "./placasRoutes.js";
import creditosRoutes from "./creditosRoutes.js";
import transferenciasRoutes from "./transferenciasRoutes.js";
import prestamosRoutes from "./prestamosRoutes.js";
import solicitudesRoutes from "./solicitudesRoutes.js";
import ticketsRoutes from "./ticketsRoutes.js";
import testRoutes from "./testRoutes.js";


import verifyToken from "../middlewares/verifyToken.js";


const router = Router();

// Ruta principal
router.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Bienvenido a la API del Sistema de control de combustible vehicular."
    });
});


router.get(
    "/perfil",
    verifyToken,
    (req, res) => {

        return res.json({
            success: true,
            user: req.user
        });

    }
);

// Auth
router.use("/auth", authRoutes);

// Usuarios

router.use("/usuarios", usuariosRoutes);

// Empresas
router.use("/empresas", empresasRoutes);

// Sucursales
router.use("/sucursales", sucursalesRoutes);

// Areas
router.use("/areas", areasRoutes);

// Unidades
router.use("/unidades", unidadesRoutes);

// Asignaciones
router.use("/asignaciones", asignacionesRoutes);

// Placas
router.use("/placas", placasRoutes);

// creditos
router.use("/creditos", creditosRoutes);

// transferencias gasolineras
router.use("/transferencias", transferenciasRoutes);

// Prestamos unidades
router.use("/prestamos", prestamosRoutes);

// Solicitudes
router.use("/solicitudes", solicitudesRoutes);

// Tickets
router.use(
    "/tickets",
    ticketsRoutes
);

// email

router.use("/test", testRoutes);

export default router;