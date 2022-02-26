const { request, response } = require("express")
const jsonwebtoken = require("jsonwebtoken")
const Users = require("../models/users")


const validarJwt = async(req = request, res = response, next) => {
    const token = req.header('Authorization')
    
    if (!token) {
        return res.status(401).json({
            msj:'Se requiere token'
        })
    }
    //console.log(token);
    
    try {

        const {uid} = jsonwebtoken.verify(token, process.env.SECRETOPPRIVATEKEY)

        const user = await Users.findById(uid);

        if (!user) {
            return res.status(401).json({
                msj:'Token no valido - Usuario no existente'
            })
        }

        //TODO Verificar el Uid teniendo estado en true
        if (!user.estado) {
            return res.status(401).json({
                msj:'Token no valido - Estado false de usuario'
            })
        }

        req.uid = user;
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msj:'Token no valido'
        })
    }

}

module.exports = {
    validarJwt
}