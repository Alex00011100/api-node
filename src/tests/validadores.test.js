const { passRegex } = require('../middlewares/verificarPassword.js');
describe('Validación de contraseña', () => {

    test('Rechazar longitud menor a 8 caracteres', () => {
        expect(passRegex.test('Abc123')).toBe(false);
    });
    test('Rechazar sin mayúscula', () => {
        expect(passRegex.test('abcdefg1')).toBe(false);
    });
    test('Rechazar sin número', () => {
        expect(passRegex.test('Abcdefgh')).toBe(false);
    });
    test('Rechazar con espacios', () => {
        expect(passRegex.test('Abcdefg 1')).toBe(false);
    });
    test('Rechazar con caracteres especiales', () => {
        expect(passRegex.test('Abcdefg1!')).toBe(false);
    });
    test('Aceptar contraseña válida', () => {
        expect(passRegex.test('Abcdefg1')).toBe(true);
    });
});