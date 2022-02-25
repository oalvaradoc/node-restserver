const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users');
const { isRolValid, emailExit, exitUserById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usersGet );

router.put('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom(exitUserById),
    check('rol').custom(isRolValid),
    validarCampos,],
    usersPut );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmail(),
    check('password','El password debe contener mas de 6 caracteres').isLength({min:6}),
    //check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExit),
    check('rol').custom(isRolValid),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], usersPost );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( exitUserById ),
    validarCampos
],usersDelete );

module.exports = router;