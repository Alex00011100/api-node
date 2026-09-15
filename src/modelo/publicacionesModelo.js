const pool = require('../config/db.js'); // Importación de la configuración de la base de datos

const registrarPublicacion = async (titulo, contenido, autor_id) => {
    const query = 'INSERT INTO publicaciones (titulo, contenido, autor_id) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query , [titulo, contenido, autor_id]);
    return rows[0]; // Devuelve la publicación recién creada
};
const eliminarPublicacion = async (id) => {
    const query = 'DELETE FROM publicaciones WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0]; // Devuelve la publicación eliminada
};
const modificarPublicacion = async (id, titulo, contenido) => {
    const query = 'UPDATE publicaciones SET titulo = $1, contenido = $2 WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [titulo, contenido, id]);
    return rows[0]; // Devuelve la publicación modificada
};
const obtenerPublicaciones = async () => {
    const query = 'SELECT * FROM publicaciones';
    const { rows } = await pool.query(query);
    return rows; // Devuelve todas las publicaciones
};


module.exports = {
    registrarPublicacion,
    eliminarPublicacion,
    modificarPublicacion,
    obtenerPublicaciones
};