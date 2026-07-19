 -- drop database control_vehicular_unificada1;
-- =====================================================
-- CREACIÓN DE BASE DE DATOS
-- =====================================================
CREATE DATABASE IF NOT EXISTS control_vehicular_unificada1;
USE control_vehicular_unificada1;

SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- 1. CATÁLOGOS
-- =====================================================

-- TABLA: actividad

DROP TABLE IF EXISTS actividad;
CREATE TABLE actividad (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    limite_mensual DECIMAL(10,2) DEFAULT 0.00,
    estado TINYINT DEFAULT 1
);

-- TABLA: areas
DROP TABLE IF EXISTS areas;
CREATE TABLE areas (
    id_area INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL
);

-- TABLA: combustible
DROP TABLE IF EXISTS combustible;
CREATE TABLE combustible (
    id_combustible INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(25) NOT NULL
);

-- TABLA: metodos_pago
DROP TABLE IF EXISTS metodos_pago;
CREATE TABLE metodos_pago (
    id_metodo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- TABLA: transferencia_gasolineras
DROP TABLE IF EXISTS transferencia_gasolineras;
CREATE TABLE transferencia_gasolineras (
    id_transferencia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_gasolinera VARCHAR(100) NOT NULL
);



-- =====================================================
-- TABLA: empresas
-- =====================================================

DROP TABLE IF EXISTS empresas;

CREATE TABLE empresas (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(255),
    rfc VARCHAR(20),
    regimen_fiscal VARCHAR(255),
    nombre_comercial VARCHAR(255),
    direccion VARCHAR(255),
    inicio_operaciones DATE,
    estatus ENUM('Activa','Inactiva') DEFAULT 'Activa',
    actividad_economica VARCHAR(255)
);


-- =====================================================
-- TABLA: Sucursales
-- =====================================================
DROP TABLE IF EXISTS Sucursales;
CREATE TABLE Sucursales (
    id_sucursal INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) DEFAULT NULL,
    correo VARCHAR(150) DEFAULT NULL,
    horario VARCHAR(150) DEFAULT NULL,
    estado TINYINT DEFAULT 1,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_empresa INT NOT NULL,

    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa),

    UNIQUE KEY uk_correo_sucursal (correo),
    KEY idx_estado (estado)
);

-- =====================================================
-- TABLA: creditos_gasolineras
-- =====================================================
DROP TABLE IF EXISTS creditos_gasolineras;
CREATE TABLE creditos_gasolineras (
    id_credito INT AUTO_INCREMENT PRIMARY KEY,
    nombre_credito VARCHAR(100) NOT NULL,
    rfc VARCHAR(13) DEFAULT NULL,
    regimen_fiscal VARCHAR(100) DEFAULT NULL,
    direccion VARCHAR(255) DEFAULT NULL,
    telefono VARCHAR(20) DEFAULT NULL,
    inicio_convenio DATE DEFAULT NULL,
    vigencia VARCHAR(50) DEFAULT NULL,
    limite_credito DECIMAL(10,2) DEFAULT NULL,
    estado TINYINT DEFAULT 1
);


-- =====================================================
-- TABLA: Unidades
-- =====================================================
DROP TABLE IF EXISTS Unidades;
CREATE TABLE Unidades (
    id_unidad INT PRIMARY KEY AUTO_INCREMENT,
    cve VARCHAR(50) UNIQUE,
    marca VARCHAR(100),
    anio INT,
    version VARCHAR(100),
    tipo VARCHAR(100),
    clase VARCHAR(100),
    modelo VARCHAR(50),
    niv VARCHAR(50),
    motor VARCHAR(50),
    transmision VARCHAR(50),
    id_combustible INT NOT NULL,
    color VARCHAR(50),
    -- id_placas INT NULL,
    telefono_gps VARCHAR(20),
    sim_gps VARCHAR(20),
    uid VARCHAR(50),
    propietario VARCHAR(255),
    compra_arrendado VARCHAR(20),
    id_empresa INT,
    id_sucursal INT,
    fecha_adquisicion DATE,
    valor_factura DECIMAL(12,2),
    url_factura VARCHAR(255),
    foto_url VARCHAR(255),
    kilometraje_actual DECIMAL(10,2),
    litros_actuales DECIMAL(6,2),
    tolerancia DECIMAL(10,2) DEFAULT 0.00,
    capacidad_tanque DECIMAL(10,2) DEFAULT 0.00,
    kilometraje_por_litro DECIMAL(10,2),
    id_credito INT,
    es_utilitario ENUM('Utilitario','No Utilitario') DEFAULT 'No Utilitario',
    estado TINYINT DEFAULT 1,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,


    INDEX idx_niv (niv),
    INDEX idx_sucursal (id_sucursal),
    INDEX idx_empresas (id_empresa),

    CONSTRAINT fk_unidades_combustible FOREIGN KEY (id_combustible) REFERENCES combustible(id_combustible),
    CONSTRAINT fk_unidades_empresas FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa) ON DELETE SET NULL,
    CONSTRAINT fk_unidades_sucursal FOREIGN KEY (id_sucursal) REFERENCES Sucursales(id_sucursal) ON DELETE SET NULL,
    CONSTRAINT fk_unidades_credito FOREIGN KEY (id_credito) REFERENCES creditos_gasolineras(id_credito) ON DELETE SET NULL
);



-- =====================================================
-- TABLA: Usuarios
-- =====================================================

DROP TABLE IF EXISTS Usuarios;
CREATE TABLE Usuarios (
    id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    correo VARCHAR(255) DEFAULT NULL,

    rol ENUM(
        'Superusuario',
        'Administrador',
        'Contabilidad',
        'Conductor'
    ) NOT NULL,

    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    must_change_password TINYINT DEFAULT 1,
    fecha_ultimo_login TIMESTAMP NULL DEFAULT NULL,
    estado TINYINT DEFAULT 1,

    id_empresa INT DEFAULT NULL,
    id_sucursal INT DEFAULT NULL,
    id_area INT DEFAULT NULL,

    UNIQUE KEY uk_usuario (usuario),
    UNIQUE KEY uk_correo (correo),

    KEY idx_empresas (id_empresa),
    KEY idx_sucursal (id_sucursal),
    KEY idx_area (id_area),

    CONSTRAINT fk_usuario_empresas FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa) ON DELETE SET NULL,
    CONSTRAINT fk_usuario_sucursal FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal) ON DELETE SET NULL,
    CONSTRAINT fk_usuario_area FOREIGN KEY (id_area) REFERENCES areas(id_area) ON DELETE SET NULL
);

-- =====================================================
-- TABLA: gasolineras
-- =====================================================
-- DROP TABLE IF EXISTS gasolineras;
-- CREATE TABLE gasolineras (
--     id_gasolinera INT AUTO_INCREMENT PRIMARY KEY,
--     nombre VARCHAR(255) NOT NULL,
--     rfc VARCHAR(20) DEFAULT NULL,
--     regimen_fiscal VARCHAR(50) DEFAULT NULL,
--     direccion VARCHAR(255) DEFAULT NULL,
--     responsable VARCHAR(255) DEFAULT NULL,
--     telefono VARCHAR(20) DEFAULT NULL,
--     estado TINYINT DEFAULT 1
-- );



-- =====================================================
-- TABLA: ASIGNACIONES
-- =====================================================

DROP TABLE IF EXISTS Asignaciones;
CREATE TABLE Asignaciones (
    id_asignacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NULL,
    id_unidad INT NOT NULL,
    fecha_asignacion DATE NOT NULL,
    fecha_fin DATE DEFAULT NULL,

    status ENUM('activo','inactivo') DEFAULT 'activo',

    CONSTRAINT fk_asignaciones_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL,
    CONSTRAINT fk_asignaciones_unidad FOREIGN KEY (id_unidad) REFERENCES Unidades(id_unidad) ON DELETE CASCADE
);



-- =====================================================
-- TABLA: solicitudes
-- =====================================================
DROP TABLE IF EXISTS solicitudes;
CREATE TABLE solicitudes (
    id_solicitud INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_vehiculo INT NOT NULL,
    km_actual INT NOT NULL,
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    litros_solicitados DECIMAL(6,2) NOT NULL,
    id_combustible INT NOT NULL,
    id_metodo INT DEFAULT NULL,
    estado ENUM('Pendiente','Aprobada','Rechazada','Auto-Aprobada','Finalizado') DEFAULT 'Pendiente',
    observaciones TEXT,
    motivo_rechazo VARCHAR(255) DEFAULT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_credito INT DEFAULT NULL,
    litros_actuales DECIMAL(6,2) DEFAULT NULL,
    id_transferencia INT DEFAULT NULL,
    nombre_gasolinera VARCHAR(255) DEFAULT NULL,
    id_actividad INT DEFAULT NULL,
    foto_tablero VARCHAR(255) DEFAULT NULL,
    foto_anticongelante VARCHAR(255) DEFAULT NULL,
    foto_balloneta VARCHAR(255) DEFAULT NULL,
    foto_frenos VARCHAR(255) DEFAULT NULL,
    foto_motor VARCHAR(255) DEFAULT NULL,

    KEY idx_usuario (id_usuario),
    KEY idx_vehiculo (id_vehiculo),
    KEY idx_combustible (id_combustible),
    KEY idx_metodo (id_metodo),
    KEY idx_credito (id_credito),
    KEY idx_transferencia (id_transferencia),
    KEY idx_actividad (id_actividad),

    CONSTRAINT solicitudes_fk_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios (id_usuario) ON DELETE RESTRICT,
    CONSTRAINT solicitudes_fk_unidad FOREIGN KEY (id_vehiculo) REFERENCES Unidades (id_unidad) ON DELETE RESTRICT,
    CONSTRAINT solicitudes_fk_combustible FOREIGN KEY (id_combustible) REFERENCES combustible (id_combustible),
    CONSTRAINT solicitudes_fk_metodo FOREIGN KEY (id_metodo) REFERENCES metodos_pago (id_metodo),
    CONSTRAINT solicitudes_fk_credito FOREIGN KEY (id_credito) REFERENCES creditos_gasolineras (id_credito),
    CONSTRAINT solicitudes_fk_transferencia FOREIGN KEY (id_transferencia) REFERENCES transferencia_gasolineras (id_transferencia),
    CONSTRAINT solicitudes_fk_actividad FOREIGN KEY (id_actividad) REFERENCES actividad (id_actividad)
);


-- =====================================================
-- TABLA: tickets
-- =====================================================
DROP TABLE IF EXISTS tickets;
CREATE TABLE tickets (
    id_ticket INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_solicitud INT NOT NULL,
    numero_ticket VARCHAR(50) NOT NULL,
    fecha_compra DATE NOT NULL,
    monto_total DECIMAL(10,2) NOT NULL,
    foto_ticket VARCHAR(255) NOT NULL,
    foto_tablero_final VARCHAR(255) NOT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    litros_cargados DECIMAL(6,2) NOT NULL,
    precio_por_litro DECIMAL(10,2) NOT NULL,

    KEY idx_solicitud (id_solicitud),
    UNIQUE KEY unique_numero_ticket (numero_ticket),

    CONSTRAINT tickets_fk_solicitud FOREIGN KEY (id_solicitud) REFERENCES solicitudes (id_solicitud) ON DELETE CASCADE
);


-- =====================================================
-- TABLA: consumos
-- =====================================================
DROP TABLE IF EXISTS consumos;
CREATE TABLE consumos (
    id_consumo INT AUTO_INCREMENT PRIMARY KEY,
    id_solicitud INT NOT NULL,
    id_unidad INT NOT NULL,
    id_usuario INT NOT NULL,
    litros_iniciales DECIMAL(6,2) NOT NULL,
    -- litros_solicitud DECIMAL(6,2) NOT NULL,
    -- litros_cargados DECIMAL(6,2) NOT NULL,
    litros_final_usuario DECIMAL(6,2) NOT NULL,
    litros_final_teorico DECIMAL(6,2) NOT NULL,
    litros_gastados DECIMAL(6,2) DEFAULT NULL,
    tolerancia_usada DECIMAL(5,2) DEFAULT 0.00,
    diferencia DECIMAL(6,2) GENERATED ALWAYS AS (litros_final_teorico - litros_final_usuario) STORED,
    rendimiento_kmxl DECIMAL(6,2) DEFAULT NULL,
    km_recorridos INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_consumos_solicitud FOREIGN KEY (id_solicitud) REFERENCES solicitudes(id_solicitud) ON DELETE CASCADE,
    CONSTRAINT fk_consumos_unidad FOREIGN KEY (id_unidad) REFERENCES Unidades(id_unidad) ON DELETE CASCADE,
    CONSTRAINT fk_consumos_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);



-- =====================================================
-- TABLA: mensajes_solicitud
-- =====================================================
DROP TABLE IF EXISTS mensajes_solicitud;
CREATE TABLE mensajes_solicitud (
    id_mensaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_solicitud INT NOT NULL,
    id_remitente INT NOT NULL,
    mensaje TEXT NOT NULL,
    archivo_url VARCHAR(255) DEFAULT NULL,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,

    KEY idx_solicitud (id_solicitud),
    KEY idx_remitente (id_remitente),

    CONSTRAINT mensajes_solicitud_fk_solicitud FOREIGN KEY (id_solicitud) REFERENCES solicitudes (id_solicitud) ON DELETE CASCADE,
    CONSTRAINT mensajes_solicitud_fk_remitente FOREIGN KEY (id_remitente) REFERENCES Usuarios (id_usuario) ON DELETE CASCADE
);


-- =====================================================
-- TABLA: notificaciones
-- =====================================================
DROP TABLE IF EXISTS notificaciones;
CREATE TABLE notificaciones (
    id_notificacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_solicitud INT NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visto TINYINT DEFAULT 0,

    KEY idx_usuario (id_usuario),
    KEY idx_solicitud (id_solicitud),

    CONSTRAINT notificaciones_fk_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios (id_usuario) ON DELETE CASCADE,
    CONSTRAINT notificaciones_fk_solicitud FOREIGN KEY (id_solicitud) REFERENCES solicitudes (id_solicitud) ON DELETE CASCADE
);

-- =====================================================
-- TABLA: tickets_alertas
-- =====================================================
DROP TABLE IF EXISTS tickets_alertas;
CREATE TABLE tickets_alertas (
    id_ticket_alerta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_consumo INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('Abierto','Cerrado') DEFAULT 'Abierto',
    solucion TEXT DEFAULT NULL,
    usuario_cierre INT DEFAULT NULL,
    fecha_cierre DATETIME DEFAULT NULL,

    KEY idx_consumo (id_consumo),
    KEY idx_usuario_cierre (usuario_cierre),

    CONSTRAINT tickets_alertas_fk_consumo FOREIGN KEY (id_consumo) REFERENCES consumos (id_consumo) ON DELETE CASCADE,
    CONSTRAINT tickets_alertas_fk_usuario_cierre FOREIGN KEY (usuario_cierre) REFERENCES Usuarios (id_usuario) ON DELETE SET NULL
);

-- =====================================================
-- TABLA: anomalias
-- =====================================================
DROP TABLE IF EXISTS anomalias;
CREATE TABLE anomalias (
    id_anomalia INT AUTO_INCREMENT PRIMARY KEY,
    id_ticket INT NULL,
    id_solicitud INT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_detectada DATETIME DEFAULT CURRENT_TIMESTAMP,
    notificado TINYINT DEFAULT 0,

    CONSTRAINT fk_anomalias_ticket FOREIGN KEY (id_ticket) REFERENCES tickets(id_ticket) ON DELETE SET NULL,
    CONSTRAINT fk_anomalias_solicitud FOREIGN KEY (id_solicitud) REFERENCES solicitudes(id_solicitud) ON DELETE CASCADE
);


-- =====================================================
-- TABLA: Placas
-- =====================================================
DROP TABLE IF EXISTS Placas;
CREATE TABLE Placas (
    id_placa INT PRIMARY KEY AUTO_INCREMENT,
    folio VARCHAR(50) DEFAULT NULL,
    placa VARCHAR(10) NOT NULL,
    fecha_expedicion DATE DEFAULT NULL,
    fecha_vigencia DATE DEFAULT NULL,
    url_placa_frontal VARCHAR(255) DEFAULT NULL,
    url_placa_trasera VARCHAR(255) DEFAULT NULL,
    requiere_renovacion TINYINT DEFAULT 0,
    monto_pago DECIMAL(10,2) NOT NULL,
    url_comprobante_pago VARCHAR(255) DEFAULT NULL,
    url_tarjeta_circulacion VARCHAR(255) DEFAULT NULL,
    id_unidad INT DEFAULT NULL,

    CONSTRAINT unique_placa UNIQUE (placa),
    CONSTRAINT fk_placas_unidad FOREIGN KEY (id_unidad) REFERENCES Unidades(id_unidad) ON DELETE SET NULL
);


-- =====================================================
-- TABLA: solicitudes_mensajes
-- =====================================================

DROP TABLE IF EXISTS solicitudes_mensajes;
CREATE TABLE solicitudes_mensajes (
    id_mensaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_solicitud INT NOT NULL,
    id_usuario INT NOT NULL,
    mensaje TEXT NOT NULL,
    archivo_adjunto VARCHAR(255) DEFAULT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    KEY idx_solicitud (id_solicitud),
    KEY idx_usuario (id_usuario),

    CONSTRAINT solicitudes_mensajes_fk_solicitud FOREIGN KEY (id_solicitud) REFERENCES solicitudes(id_solicitud) ON DELETE CASCADE,
    CONSTRAINT solicitudes_mensajes_fk_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios (id_usuario) ON DELETE CASCADE
);


-- =====================================================
-- 2. TABLAS OPERATIVAS
-- =====================================================

DROP TABLE IF EXISTS Alertas;
CREATE TABLE Alertas (
    id_alerta INT PRIMARY KEY AUTO_INCREMENT,
    id_unidad INT NOT NULL,
    tipo_alerta VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_generada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_resuelta DATETIME DEFAULT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    detalle JSON DEFAULT NULL,
    
    KEY idx_id_unidad (id_unidad),
    CONSTRAINT fk_alertas_unidades FOREIGN KEY (id_unidad) REFERENCES Unidades (id_unidad) ON DELETE CASCADE
);



-- =====================================================
-- TABLA: historial_prestamos
-- =====================================================
DROP TABLE IF EXISTS historial_prestamos;
CREATE TABLE historial_prestamos (
    id_historial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_vehiculo INT NOT NULL,
    fecha_inicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_fin DATETIME DEFAULT NULL,
    firma_desasignacion VARCHAR(255) DEFAULT NULL,

    KEY idx_usuario (id_usuario),
    KEY idx_vehiculo (id_vehiculo),
    KEY idx_fecha_fin (fecha_fin),

    CONSTRAINT historial_prestamos_fk_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios (id_usuario) ON DELETE CASCADE,
    CONSTRAINT historial_prestamos_fk_unidad FOREIGN KEY (id_vehiculo) REFERENCES Unidades (id_unidad) ON DELETE CASCADE
);


-- =====================================================
-- TABLA: HistorialAsignaciones
-- =====================================================

DROP TABLE IF EXISTS HistorialAsignaciones;
CREATE TABLE HistorialAsignaciones (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_asignacion INT NOT NULL,
    id_usuario INT DEFAULT NULL,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_asignacion DATE DEFAULT NULL,
    fecha_fin DATE DEFAULT NULL,

    CONSTRAINT fk_historial_asignacion FOREIGN KEY (id_asignacion) REFERENCES Asignaciones(id_asignacion) ON DELETE CASCADE,
    CONSTRAINT fk_historial_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL
);


-- =====================================================
-- TABLA: mensajes_leidos
-- =====================================================
DROP TABLE IF EXISTS mensajes_leidos;
CREATE TABLE mensajes_leidos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_mensaje INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_lectura DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_lectura (id_mensaje, id_usuario),
    KEY idx_usuario (id_usuario),

    CONSTRAINT mensajes_leidos_fk_mensaje FOREIGN KEY (id_mensaje) REFERENCES mensajes_solicitud (id_mensaje) ON DELETE CASCADE,
    CONSTRAINT mensajes_leidos_fk_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios (id_usuario) ON DELETE CASCADE
);
SET FOREIGN_KEY_CHECKS = 1;