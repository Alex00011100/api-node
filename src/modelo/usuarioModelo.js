const pool = require('../config/db.js'); // Importación de la configuración de la base de datos

const crearUsuario = async (nombre, usuario, email, passwordHasheada) => {
    // Usamos '$numero' para evitar inyecciones SQL en POSTGRE. en MySQL es '?'
    // Nunca concatenar variables directamente en la consulta SQL
    const query = 'INSERT INTO usuarios (nombre,usuario,email,password_hash) VALUES ($1, $2, $3, $4) RETURNING *';
    // Returning * nos devuelve el registro insertado, útil para confirmar que se insertó correctamente

    // Pasamos los datos en un array en el mismo orden que los '$numero' en la consulta
    const {rows} = await pool.query(query, [nombre, usuario, email, passwordHasheada]);
    return rows[0]; // rows[0] devuelve el usuario recién generado.
};
const obtenerUsuarioPorEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0]; // Devuelve el primer usuario encontrado con ese email, o undefined si no existe
};
const obtenerUsuarioPorId = async (id) => {
    const query = 'SELECT u.id, u.nombre, u.usuario, u.email, eu.nombre AS rol, u.activo, u.fecha_creacion FROM usuarios u LEFT JOIN estados_usuario eu ON u.id_rol = eu.id WHERE u.id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]; // Devuelve el primer usuario encontrado con ese id, o undefined si no existe
};
module.exports = {
    crearUsuario,
    obtenerUsuarioPorEmail,
    obtenerUsuarioPorId,
};