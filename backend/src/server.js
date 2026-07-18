import app from "./app.js";
import { testConnection } from "./config/connection.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {

        // Verificar conexión a MySQL
        await testConnection();

        // Iniciar servidor
        app.listen(PORT, () => {

            console.log("========================================");
            console.log("🚀 Servidor iniciado correctamente");
            console.log(`🌐 URL: http://localhost:${PORT}`);
            console.log(`📡 Puerto: ${PORT}`);
            console.log("========================================");

        });

    } catch (error) {

        console.error("❌ No fue posible iniciar el servidor.");
        console.error(error.message);

        process.exit(1);

    }
};

startServer();