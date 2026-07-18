import { Router } from "express";

import {
    login,
    register,
    forgotPassword,
    changePassword
} from "../controllers/authController.js";


const router = Router();


router.post(
    "/login",
    login
);


router.post(
    "/register",
    register
);


router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/change-password",
    changePassword
);

export default router;