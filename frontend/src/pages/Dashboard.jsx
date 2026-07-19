    import React from "react";
    import "../styles/MainLayout.css";

    export default function Dashboard() {
    return (
        <div className="superusuario-container">

        <h1>Bienvenido/a</h1>

        <h3>
            Sistema de Control de Combustible y Vehículos de la empresa en telecomunicaciones
        </h3>

        <p className="intro-text">
            Este sistema permite administrar y supervisar el consumo de combustible,
            solicitudes de carga, vehículos, usuarios y préstamos de unidades
            utilitarias de Redes Integrales de Fibra.

            <br /><br />

            A través de esta plataforma se puede llevar un mejor control operativo,
            administrativo y financiero de la flotilla vehicular.
        </p>

        <div className="info-cards">

            <div className="card">
            <h2>🚗 Gestión Vehicular</h2>
            <p>
                Administración del parque vehicular, asignación de unidades,
                préstamos de vehículos y control de kilometraje.
            </p>
            </div>

            <div className="card">
            <h2>⛽ Control de Combustible</h2>
            <p>
                Registro de solicitudes de combustible, cargas realizadas,
                litros consumidos y seguimiento de comprobantes.
            </p>
            </div>

            <div className="card">
            <h2>👥 Administración</h2>
            <p>
                Gestión de usuarios, empresas, sucursales, créditos y
                métodos de pago utilizados en las operaciones.
            </p>
            </div>

        </div>

        <footer className="footer">
            <div className="footer-content">
            <div className="contact-info">
                <span>📧 soporte@rifibra.com.mx</span>
                <span>📞 (55) 1234-5678</span>
                <span>📍 Av. Tecnológica #100, CDMX</span>
            </div>
            </div>
        </footer>

        </div>
    );
    }