const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME, // Nombre de tu base de datos
  max: 10,                 // Límite de conexiones simultáneas en el pool
  idleTimeoutMillis: 30000 // Tiempo antes de cerrar conexiones inactivas
});

// Prueba de conexión 
pool.query('SELECT 1 + 1 AS solucion')
.then (({rows}) => {
  console.log('Resultado de la prueba de consulta:', rows[0].solucion);
})
.catch((err) => {
  console.error('Error ejecutando la prueba de consulta:', err.stack);
});
module.exports = pool; // Exportamos el pool para usarlo en otros módulos