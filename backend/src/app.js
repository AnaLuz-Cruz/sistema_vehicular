import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middlewares globales
app.use(cors());
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