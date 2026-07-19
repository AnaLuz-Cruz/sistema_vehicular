import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

    // Orígenes permitidos
    const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
    ];

    // Middlewares globales
    app.use(
    cors({
        origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
        },
        credentials: true,
    })
    );

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==========================
    Rutas
========================== */

app.use("/", routes);

/* ==========================
    Ruta no encontrada
========================== */

app.use(notFound);

/* ==========================
    Manejo global de errores
========================== */

app.use(errorHandler);

export default app;