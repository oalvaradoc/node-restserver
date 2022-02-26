const { response, request } = require('express');
const User = require('../models/users');
const bcriptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

  const login = async(req = request, res = response) => {

    const {correo, password} = req.body;

    try {

      //TODO Verificar si el email existe
      const user = await User.findOne({correo});
      if (!user) {
        return res.status(400).json({
          msg:'Usuario | Password no son correctos - Correo'
        })
      }

      //TODO SI el usuario esta activo
      if (!user.estado) {
        return res.status(400).json({
          msg:'Usuario | Password no son correctos - Estado'
        })
      }

      //TODO Verificar la constraseña
      const validPass = bcriptjs.compareSync(password, user.password) 
      if (!validPass) {
        return res.status(400).json({
          msg:'Usuario | Password no son correctos - Password'
        })
      }

      //TODO Generar JWR
      const token = await generarJWT(user.id);

      return res.json({
        msg:'Login OK',
        user,
        token
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg:'Error en servicio login'
      })
    }

  }


  module.exports = {
    login
  }