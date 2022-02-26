const { request, response } = require("express")

const isAdminRol=(req = request, res = response, next)=>{

    if (!req.user) {
        return res.status(500).json({
            msj:'Se requiere verificar el role sin validar el token false'
        })
    }

    const {rol, nombre} = req.user;

    if (rol != 'ADMIN_ROLE') {
        return res.status(500).json({
            msj:`${nombre} no es administrador - NO autorizado`
        })
    }

    next()
}

const tieneRole = ( ...roles ) => {
    return (req = request, res = response, next)=>{

        if (!req.user) {
            return res.status(500).json({
                msj:'Se requiere verificar el role sin validar el token false'
            })
        }

        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${ roles }`
            })
        }

        next()
    }
}
 

module.exports = {
    isAdminRol,
    tieneRole
}