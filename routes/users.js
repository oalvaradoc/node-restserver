const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const { isRolValid, emailExit } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmail(),
    check('password','El password debe contener mas de 6 caracteres').isLength({min:6}),
    //check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExit),
    check('rol').custom(isRolValid),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], usersPost );

router.delete('/', usersDelete );

module.exports = router;