const { response } = require('express');
const { request } = require('http');

const usersGet = (req, res = response) => {

    const query = req.query;

    //res.send('Hello World')
    //res.status(403).json({
    res.json({
        //ok:true,
        msg:'get Api - Controlador'
    });
  }

  const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg:'put Api - Controlador',
        id
    });
  }

  const usersPost = (req, res = response) => {
      const {nombre,edad} = req.body;
        res.json({
            msg:'get Api - Controlador',
            nombre,
            edad
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