import { Router } from "express";

import { enviarCorreo } from "../utils/email.js";

const router = Router();

router.get("/correo", async (req, res) => {

    try {

        await enviarCorreo(

            process.env.EMAIL_USER,

            "Prueba Control Vehicular",

            `
                <h2>Correo de prueba</h2>

                <p>

                    Si estás leyendo este correo,

                    Nodemailer está funcionando correctamente.

                </p>
            `

        );

        return res.json({

            success: true,

            message: "Correo enviado correctamente."

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

export default router;