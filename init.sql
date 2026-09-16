-- Archivo: init.sql
CREATE DATABASE IF NOT EXISTS Api_tercero;

USE Api_tercero;

CREATE TABLE IF NOT EXISTS estados_usuario (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO estados_usuario (descripcion) 
VALUES ('Activo'), ('Inactivo')
ON CONFLICT (descripcion) DO NOTHING;

-- Tabla: usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_rol INTEGER REFERENCES estados_usuario(id),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: publicaciones
CREATE TABLE publicaciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    contenido TEXT,
    autor_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE
);