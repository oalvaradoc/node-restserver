

const validarCampos  = require('../middlewares/validar-campos');
const validarRoles = require('../middlewares/validar-roles');
const validarJwt = require('../middlewares/vallidar-jwt');

module.exports={
    ...validarCampos,
    ...validarRoles,
    ...validarJwt
}