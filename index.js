//Instanciación de express
const express = require('express'); // Importación de express
const app = express(); // Instanciación de express
require('dotenv').config(); // Carga de variables de entorno desde el archivo .env
const port = process.env.PORT || 3000; // Usamos puerto definido en variables de entorno o el 3000 por defecto
const cors = require('cors'); // Sirve para negar el error de CORS al consumir la API desde un cliente externo (como Postman o un frontend separado)
// test de conexión a la base de datos
require ('./src/config/db.js'); // Importación de la configuración de la base de datos


//middlewares
app.use(express.json()); // Para que entienda json en el body
app.use(cors()); // Uso el middleware de CORS

// Rutas
app.use('/api/usuarios', require('./src/rutas/usuarioRutas')); // Rutas de usuario
app.use('/api/publicaciones', require('./src/rutas/publicacionesRutas')); // Rutas de publicaciones
// Iniciamos el servidor

app.listen(port,()=>{
    console.log(`Servidor escuchando en http://localhost:${port}`)
});