const verificarUpdate = (req, res, next) => {
    const { id } = req.params;
    const { titulo, contenido } = req.body;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ mensaje: 'ID de publicación inválido' });
    }
    if (!titulo?.trim() || !contenido?.trim()) {
        return res.status(400).json({ 
            mensaje: 'Faltan datos obligatorios (titulo y contenido no pueden estar vacíos)' 
        });
    }
    next();
};

module.exports = verificarUpdate;