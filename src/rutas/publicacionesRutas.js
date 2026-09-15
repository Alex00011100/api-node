const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken'); // Importación del middleware de verificación de token
const verificarUpdate = require('../middlewares/verificarUpdate'); // Importación del middleware de verificación de actualización
const { crearPublicacion, eliminarPublicacionControlador, modificarPublicacionControlador, obtenerPublicacionesControlador } = require('../controlador/publicacionesControlador'); // Importación del controlador de publicaciones
// Rutas para publicaciones
router.post('/', verificarToken, crearPublicacion); // Ruta para crear una publicación, protegida por el middleware de verificación de token
router.put('/:id', verificarToken, verificarUpdate, modificarPublicacionControlador); // Ruta para modificar una publicación, protegida por el middleware de verificación de token y actualización
router.delete('/:id', verificarToken, eliminarPublicacionControlador); // Ruta para eliminar una publicación, protegida por el middleware de verificación de token
router.get('/', obtenerPublicacionesControlador); // Ruta para obtener todas las publicaciones
module.exports = router;