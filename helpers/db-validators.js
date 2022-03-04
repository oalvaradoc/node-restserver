const { Producto, Categoria, Role, User } = require('../models');
// const Categoria = require('../models/categoria');
// const  Role  = require('../models/roles');
// const users = require('../models/users');

const isRolValid = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${rol} no esta en la base de datos`);
    }
}

const emailExit = async (correo = '') => {
    const existEmail = await User.findOne({ correo });
    if (existEmail) {
        throw new Error(`El correo ${correo} ya esta en la base de datos`);
    }
}

const exitUserById = async (id = '') => {
    const exitUser = await User.findById(id);
    if (!exitUser) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existeCategoriaPorId = async(id) => {
    const existCategoria = await Categoria.findById(id)
    if (!existCategoria) {
        throw new Error(`El id  ${id} no esta en la base de datos`);
    }
}


/**
 * Productos
 */
 const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    isRolValid,
    emailExit,
    exitUserById,
    existeCategoriaPorId,
    existeProductoPorId
}