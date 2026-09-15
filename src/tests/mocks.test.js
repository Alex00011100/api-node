const  verificarToken = require('../middlewares/verificarToken');
test('debe bloquear si no hay token', () => {
    // Simulamos una solicitud sin token
    const req = {
        headers: {}
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const next = jest.fn();
    // Pero que recorcholis es un mock
    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
});
