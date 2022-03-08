const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { validarJwt, validarArchivo } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/',[
    validarJwt,
    validarArchivo,
    validarCampos
    ],cargarArchivo
);

router.put('/:coleccion/:id',[
    validarJwt,
    validarArchivo,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas(c,['users','productos']) ),
    validarCampos
    ],actualizarImagenCloudinary
);


router.get('/:coleccion/:id',[
    validarJwt,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas(c,['users','productos']) ),
    validarCampos
    ],mostrarImagen
);

module.exports = router;