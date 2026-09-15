const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario, mostrarPerfil} = require('../controlador/usuarioControlador'); // Importación del controlador de usuario
const verificarToken = require('../middlewares/verificarToken'); // Importación del middleware de verificación de token
const { validarPassword } = require('../middlewares/verificarPassword'); // Importación del middleware de validación de contraseña
router.post('/registrar', validarPassword, registrarUsuario);
router.get('/perfil', verificarToken, mostrarPerfil);
router.post('/login', loginUsuario);

module.exports = router;