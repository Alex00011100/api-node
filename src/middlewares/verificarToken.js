// Middleware para verificar que el token JWT sea válido y esté presente en la cabecera de autorización
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Ingrese un token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido.' });
    }
    req.user = user;
    next();
  });
};
module.exports = verificarToken;