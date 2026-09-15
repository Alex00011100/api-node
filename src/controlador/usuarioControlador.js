const bcrypt = require('bcrypt');
const { crearUsuario, obtenerUsuarioPorEmail, obtenerUsuarioPorId } = require('../modelo/usuarioModelo'); // Importación de la función para crear usuario desde el modelo
const jwt = require('jsonwebtoken');


const registrarUsuario = async (req, res) => {
    const { nombre, usuario, email, password } = req.body;

    // Validación básica de los datos recibidos
    if (!nombre || !usuario || !email || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // Hashear la contraseña
        const saltRounds = 10; // Número de rondas de sal para bcrypt
        const passwordHasheada = await bcrypt.hash(password, saltRounds);

        // Llamar a la función del modelo para crear el usuario
        await crearUsuario(nombre, usuario, email, passwordHasheada);

        // Devolvemos mensaje de éxito al cliente
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        // Enviar un mensaje de error al cliente en caso de fallo
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const loginUsuario = async (req, res) => {
    try {
    const { email, password } = req.body;
   // console.log('Datos recibidos en loginUsuario:', { email, password }); // Log para depuración
    // 1. Validación básica de los datos recibidos
    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
    };
    // 2. Busqueda del usuario en la base de datos por email
    const usuario = await obtenerUsuarioPorEmail(email);
    console.log ('Usuario encontrado en la base de datos:', usuario); // Log para depuración
    // 3. Si el usuario no existe, devolvemos un error
    if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    };
    /* DEBUG
    console.log('--- DEBUG LOGIN ---');
console.log('Password enviada:', password);
console.log('Tipo password:', typeof password);
console.log('Hash en BD:', usuario.password_hash);
console.log('Tipo hash BD:', typeof usuario.password_hash);
console.log('Longitud del hash en BD:', usuario.password_hash?.length);
console.log('-------------------');
*/
    // 4. Comparación de la contraseña proporcionada con la contraseña hasheada almacenada en la base de datos
    const passwordValida = await bcrypt.compare(
        password, // La contraseña proporcionada por el usuario
        usuario.password_hash // La contraseña hasheada almacenada en la base de datos
    );
    // 5. Si la contraseña no es válida, devolvemos un error
    if (!passwordValida) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    };
    // 6. El "payload": DATOS UTILES
    // Nunca poner contraseñas acá
    const payload = {
        id: usuario.id,
        rol: usuario.id_rol
    };
    // 7. Firmar el token JWT con una clave secreta y un tiempo de expiración
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '2h' } // El token expirará en 2 horas
    );
    // 8. Responder 200 OK y entregar el TOKEN
    res.status(200).json({
        mensaje: 'Login exitoso',
        token: token
    });
} catch (error) {
    // 9. Enviar un mensaje de error al cliente en caso de fallo
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
};
};

const mostrarPerfil = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Token no proporcionado o formato inválido' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido o expirado' });
        }
 
        // 'decoded' contiene el payload con el que creaste el token (ej: jwt.sign({ id, rol }, secret))
        const id = decoded.id; // Extraemos el ID del usuario del payload
        obtenerUsuarioPorId(id)
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
                }
                const usuarioFixed = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    usuario: usuario.usuario,
                    email: usuario.email,
                    rol: usuario.rol,
                    activo: usuario.activo,
                    fecha_creacion: usuario.fecha_creacion
                };
                res.status(200).json({ mensaje: 'Perfil obtenido correctamente', usuario:usuarioFixed });
            });
    });
};

module.exports = {
    registrarUsuario,
    loginUsuario,
    mostrarPerfil
};