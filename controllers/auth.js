const { response, request } = require('express');
const User = require('../models/users');
const bcriptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

  const googleSingIn = async (req, res = response) => {
    const {id_token} = req.body;

    try {

      const {nombre, img, correo} = await googleVerify(id_token)

      let usuario = await User.findOne({correo})

      if (!usuario) {
        const data = {
          nombre,
          correo,
          password:':D',
          img,
          google:true,
          rol:'VENTAS_ROLE',
          estado:true
        }

        usuario = new User(data)
        await usuario.save()
      }

      if (!usuario.estado) {
        return res.status(400).json({
          meg:'Usuario Bloqueado'
        })
      }

      const token = await generarJWT(usuario.id)
      //console.log(googleUser);   

      res.json({
        usuario,
        token
      })
      
    } catch (error) {
      console.log(error);   
      res.json({
        ok:false,
        msg:'El token no se pudo verificar'
      })
    }

    
  }

  module.exports = {
    login,
    googleSingIn
  }