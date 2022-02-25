const { response, request } = require('express');
const bcriptjs = require('bcryptjs')
//const { request } = require('http');
const User = require('../models/users');

  const usersGet = (req, res = response) => {

    const query = req.query;

    //res.send('Hello World')
    //res.status(403).json({
    res.json({
        //ok:true,
        msg:'get Api - Controlador'
    });
  }

  const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { id, password, google, correo, ...resto } = req.body;

    //TODO validar base de datos
    if (password) {
      const salt = bcriptjs.genSaltSync();
      resto.password = bcriptjs.hashSync(password, salt);
      
    }

    const userDB = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg:'put Api - Controlador',
        userDB
    });
  }

  const usersPost = async (req, res = response) =>  {
    
      const {nombre, correo, password, rol, estado} = req.body;
      //const body = req.body;

      const user = new User({nombre, correo, password, rol, estado});

      const existEmail = await User.findOne({ correo })

      if (existEmail) {
        return res.status(400).json({
          msg:'El correo ya esta registrado'
        })
      }

      //const salt = bcriptjs.genSaltSync(17);
      const salt = bcriptjs.genSaltSync();

      user.password = bcriptjs.hashSync(password, salt);

      await user.save();

        res.json({
            msg:'post Api - Controlador',
            user
        });
  }

  const usersDelete = (req, res = response) => {
    //res.send('Hello World')
    //res.status(403).json({
    res.json({
        //ok:true,
        msg:'get Api - Controlador'
    });
  }

  module.exports = {
      usersGet,
      usersPut,
      usersPost,
      usersDelete
  }