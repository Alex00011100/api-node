-- Archivo: init.sql
CREATE DATABASE IF NOT EXISTS Api_tercero;

USE Api_tercero;

-- Tabla: estados_usuario
CREATE TABLE public.estados_usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

INSERT INTO public.estados_usuario (id, nombre, descripcion) VALUES
(1, 'estándar', 'usuario estándar'),
(2, 'Moderador', 'Posee algunos permisos'),
(3, 'Admin', 'Administrador, permiso total');

-- Tabla: usuarios
CREATE TABLE public.usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_rol INTEGER REFERENCES public.estados_usuario(id),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: publicaciones
CREATE TABLE public.publicaciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    contenido TEXT,
    autor_id INTEGER REFERENCES public.usuarios(id) ON DELETE CASCADE
);