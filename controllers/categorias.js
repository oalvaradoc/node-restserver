const { response, request } = require('express');
//const User = require('../models/users');
const { Categoria } = require('../models');


  const obtenerCategorias = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, categoria]=await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
      total,
      categoria
    })

  }

  const obtenerCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre')

    res.json({
      categoria
    })

  }

  const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.user._id;
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true}).populate('usuario','nombre')

    res.json({
      categoria
    })

  }
  const eliminarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true}).populate('usuario','nombre')

    res.json({
      categoria
    })

  }


  const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    try {

      //TODO Verificar si ya existe una categoria existe con el mismo nombre
      const categoriaBD = await Categoria.findOne({nombre});

      if (categoriaBD) {
        return res.status(400).json({
          msg:`La categoria ${categoriaBD.nombre}, ya existe`
        })
      }

      //console.log('1',req);
      //console.log('1',req.user);

      //console.log('2',req.user._id);

      const data = {
        nombre,
        usuario: req.user._id,
        estado: true
      }

      const categoria = new Categoria(data)

      await categoria.save();

      return res.status(200).json({
        msg:'Categoria ingresada correctamente',
        Categoria: categoria
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg:'Error en servicio crearCategoria'
      })
    }

  }


  module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
  }