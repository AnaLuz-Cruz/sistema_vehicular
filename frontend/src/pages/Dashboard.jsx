import React from "react";
import "../styles/Layout.css";

export default function Dashboard() {
    return (
        <div className="dashboard">

            <section className="dashboard-header">

                <h1 className="dashboard-title">
                    Bienvenido/a
                </h1>

                <h3 className="dashboard-subtitle">
                    Sistema de control de combustible y vehículos de la empresa de telecomunicaciones
                </h3>

                <p className="dashboard-description">
                    Este sistema permite administrar y supervisar el consumo de combustible,
                    solicitudes de carga, vehículos, usuarios y préstamos de unidades
                    utilitarias de Redes Integrales de Fibra.
                    A través de esta plataforma se puede llevar un mejor control operativo,
                    administrativo y financiero de la flotilla vehicular.
                </p>

            </section>

            <section className="dashboard-cards">

                <article className="dashboard-card">

                    <div className="card-icon">
                        🚗
                    </div>

                    <h2>Gestión vehicular</h2>

                    <p>
                        Administración del parque vehicular, asignación de unidades,
                        préstamos de vehículos y control de kilometraje.
                    </p>

                </article>

                <article className="dashboard-card">

                    <div className="card-icon">
                        ⛽
                    </div>

                    <h2>Control de combustible</h2>

                    <p>
                        Registro de solicitudes de combustible, cargas realizadas,
                        litros consumidos y seguimiento de comprobantes.
                    </p>

                </article>

                <article className="dashboard-card">

                    <div className="card-icon">
                        👥
                    </div>

                    <h2>Administración</h2>

                    <p>
                        Gestión de usuarios, empresas, sucursales, créditos y métodos
                        de pago utilizados en las operaciones.
                    </p>

                </article>

            </section>

            <footer className="dashboard-footer">

                <div className="dashboard-contact">

                    <span>📧 soporte@rifibra.com.mx</span>

                    <span>📞 (55) 1234-5678</span>

                    <span>📍 Av. Tecnológica #100, CDMX</span>

                </div>

            </footer>

        </div>
    );
}