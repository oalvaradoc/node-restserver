const  Role  = require('../models/roles');
const users = require('../models/users');

const isRolValid = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${rol} no esta en la base de datos`);
    }
}

const emailExit = async (correo = '') => {
    const existEmail = await users.findOne({ correo });
    if (existEmail) {
        throw new Error(`El correo ${correo} ya esta en la base de datos`);
    }
}

const exitUserById = async (id = '') => {
    const exitUser = await users.findById(id);
    if (!exitUser) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    isRolValid,
    emailExit,
    exitUserById
}