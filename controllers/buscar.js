const { response } = require("express");
const { User, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;

const coleccionPermitidas = [
    'users',
    'categoria',
    'productos',
    'roles'
]

const findUsers = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino)

    if (isMongoId) {
        const users = await User.findById(termino)
        return res.status(202).json({
            result: (users) ? [users] : []  
        })
        
    }

    const regex = new RegExp(termino,'i')


    const users = await User.find({
        $or: [{
            nombre:regex, estado:true},{correo:regex, estado:true
            }],
        $and:[{estado:true}]
    });

    return res.status(202).json({
        result: (users) ? [users] : []  
    })

}


const buscarCategorias = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino)

    let categoria = Categoria;

    if (isMongoId) {
        categoria = await Categoria.findById(termino)
        return res.status(202).json({
            result: (categoria) ? [categoria] : []  
        })
        
    }

    const regex = new RegExp(termino,'i')

    categoria = await Categoria.find({nombre:regex, estado:true });

    return res.status(202).json({
        result: (categoria) ? [categoria] : []  
    })

}

const buscarProductos = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino)

    let producto = Producto;

    if (isMongoId) {
        producto = await Producto.findById(termino).populate('categoria','nombre')
        return res.status(202).json({
            result: (producto) ? [producto] : []  
        })
        
    }

    const regex = new RegExp(termino,'i')
    producto = await Producto.find({nombre:regex, estado:true }).populate('categoria','nombre')

    return res.status(202).json({
        result: (producto) ? [producto] : []  
    })

}

const buscar = (req, res = response) => {

    try {
        const { coleccion, termino } = req.params

        if (!coleccionPermitidas.includes(coleccion)) {
            return res.status(400).json({
                msg:`Las colecciones permitidas son: ${ coleccionPermitidas}`
            })
        }


        switch (coleccion) {
            case 'users':
                findUsers(termino, res)
                break;
            case 'categoria':
                buscarCategorias(termino, res)
                break;
            case 'productos':
                buscarProductos(termino, res)
                break;
        
            default:
                return res.status(500).json({
                    msg:'Error en consulta de coleccion'
                })
                break;
        }


        // res.json({
        //     coleccion,
        //     termino
        // })
        
    } catch (error) {
        console.log("Error en el metodo buscar", error);
        res.status(500).json({
                msg:'No fue posible buscar',
                error:error.message,
                traza:error.stack
            });
    }
    
}

module.exports = {
    buscar
}