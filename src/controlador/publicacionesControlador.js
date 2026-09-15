const { registrarPublicacion, eliminarPublicacion, modificarPublicacion, obtenerPublicaciones } = require('../modelo/publicacionesModelo');

const crearPublicacion = async (req, res) => {
    const { titulo, contenido } = req.body;
    const autor_id = req.user.id;
    try {
        const publicacion = await registrarPublicacion(titulo, contenido, autor_id);
        res.status(201).json({ mensaje: 'Publicación creada correctamente', publicacion });
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).json({ mensaje: 'Error al crear la publicación' });
    }
};
const eliminarPublicacionControlador = async (req, res) => {
    const autor_id = req.user.id;
    const { id } = req.params;
    try {
        const publicacion = await eliminarPublicacion(id);
        if (!publicacion) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada' });
        };
        if (publicacion.autor_id !== autor_id) {
            return res.status(403).json({ mensaje: 'No tienes permiso para eliminar esta publicación' });
        };
        res.status(200).json({ mensaje: 'Publicación eliminada correctamente', publicacion });
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la publicación' });
    }
};
const modificarPublicacionControlador = async (req, res) => {
    const autor_id = req.user.id;
    const { id } = req.params;
    const { titulo, contenido } = req.body;
    try {
        const publicacion = await modificarPublicacion(id, titulo, contenido);
        if (!publicacion) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada' });
        };
        if (publicacion.autor_id !== autor_id) {
            return res.status(403).json({ mensaje: 'No tienes permiso para modificar esta publicación' });
        };
        res.status(200).json({ mensaje: 'Publicación modificada correctamente', publicacion });
    } catch (error) {
        console.error('Error al modificar la publicación:', error);
        res.status(500).json({ mensaje: 'Error al modificar la publicación' });
    };
};
const obtenerPublicacionesControlador = async (req, res) => {
    try {
        const publicaciones = await obtenerPublicaciones();
        res.status(200).json({ publicaciones });
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ mensaje: 'Error al obtener las publicaciones' });
    }
};
module.exports = {
    crearPublicacion,
    eliminarPublicacionControlador,
    modificarPublicacionControlador,
    obtenerPublicacionesControlador
};