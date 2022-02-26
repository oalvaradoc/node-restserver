const { response, request } = require('express');
const bcriptjs = require('bcryptjs')
//const { request } = require('http');
const User = require('../models/users');

  const usersGet = async(req = request, res = response) => {

    //const query = req.query;
    const { limite = 5 , desde = 0 } = req.query;
    const query = {estado : true}

    // const user = await User.find( query )
    //   .skip(Number(desde))
    //   .limit(Number(limite));

    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find( query )
      .skip(Number(desde))
      .limit(Number(limite))
    ])

    //res.send('Hello World')
    //res.status(403).json({
    res.json({
        //resp,

        //ok:true,
        //msg:'get Api - Controlador',
        total,
        users,
        
        // q,
        // nombre,
        // apikey,
        // page,
        // limit
    });
  }

  const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

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

  const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    const uid = req.uid;

    //Forma de Eliminar completamente un registro - No recomendado
    //const user = await User.findByIdAndDelete(id);

    //Forma recomendada
    const user = await User.findByIdAndUpdate(id, {estado:false});
    //const userAutetnicado = req.user;

    //res.send('Hello World')
    //res.status(403).json({
    res.json({
        //ok:true,
        //msg:'get Api - Controlador',
        user
    });
  }

  module.exports = {
      usersGet,
      usersPut,
      usersPost,
      usersDelete
  }