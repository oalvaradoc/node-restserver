const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJwt, isAdminRol } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', [
    validarJwt
],obtenerCategorias
);

router.get('/:id', [
    validarJwt,
    check('id','No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria
);

router.post('/', [
    validarJwt,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria
);

router.put('/:id', [
    validarJwt,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('id','No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria
);

router.delete('/:id',[
    validarJwt,
    isAdminRol,
    check('id','No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], eliminarCategoria
);

module.exports = router;