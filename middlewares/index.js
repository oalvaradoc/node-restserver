

const validarCampos  = require('../middlewares/validar-campos');
const validarRoles = require('../middlewares/validar-roles');
const validarJwt = require('../middlewares/vallidar-jwt');
const validarArchivo  = require('./validar-archivo');


module.exports={
    ...validarCampos,
    ...validarRoles,
    ...validarJwt,
    ...validarArchivo
}