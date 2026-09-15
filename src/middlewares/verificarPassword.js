// Requisitos: Minimo 8 caracteres, al menos una letra mayúscula y un número. No se permiten espacios ni caracteres especiales.
const passRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Función usada como middleware para validar la contraseña en las rutas de registro de usuario
const validarPassword = (req, res, next) => {
    const { password } = req.body;

    if (!password || !passRegex.test(password)) {
        return res.status(400).json({ 
            mensaje: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.'
        });
    }

    next();
};
module.exports = { validarPassword, passRegex };