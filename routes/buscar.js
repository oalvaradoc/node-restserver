const { Router } = require('express')
const { buscar } = require('../controllers/buscar')
const { validarJwt } = require('../middlewares')


const router = Router()

router.get('/:coleccion/:termino', [
    validarJwt
], buscar)

module.exports =  router