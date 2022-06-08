const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const Role = require('../models/role');
const { request } = require('express');
const usuariosGet = async (req = request, res = response) => {
	//const {q, nombre = 'no name' } = req.query;
	//const { limite = 15, desde = 0 } = req.query;
//	const query = { estado: true  };
	const user=req.session.usuario;
	//console.log(user);

	const usuarios = await Usuario.find();
     //   .skip(Number(desde))
      //  .limit(Number(limite));
    const total = await Usuario.countDocuments();

   /* res.json({
        total,
        usuarios 
    });/*
	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
	]);
	//console.log({total, usuarios});
	/*res.json({
        total,
        usuarios
    });*/
	res.render('usuarios.ejs',{
		total,
		usuarios,
		user,
	});
};
const registrarUsuario = async (req = request, res = response) => {
	//console.log('antes de entrar');
	const user=req.session.usuario;
	
	res.render("registrarUsuario.ejs",{user,})
};
const usuariosGetId = async (req = request, res = response) => {
	const {id} = req.params;
	const user=req.session.usuario;
    try {
        const usuarios = await Usuario.findOne({ _id:id });
        res.render("editarUsuario.ejs", {
            usuarios,
			user,
            //error: false,
            //mensaje1: "llego al render"
		});
		//console.log(usuarios)
    }catch (error) {
        console.log(error)
        res.render("usuarios.ejs", {
            error: true,
            mensaje: 'No se Encuentra el ID Seleccionado'
        })
    }
  //  const total = await Usuario.countDocuments();
};

const usuariosPost = async (req, res = response) => {
	const { nombre, apellidoP, apellidoM, celular, direccion, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, apellidoP, apellidoM, celular, direccion, correo, password, rol });
	//Encriptar contraseña
	const user=req.session.usuario;
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);
	//registrar rol 
	if(rol){
		const foundRoles = await Role.find({rol:{$in: rol}})
		usuario.rol = foundRoles.map(role=>role._id)
	}
	//Guardar en Base de datos
	await usuario.save();
	/*
    res.json({
        usuario 
    });*/
	console.log('usuario creado');

	res.redirect('/usuarios');
};
const usuariosPut = async (req, res = response) => {
	console.log("llego al put")
	const user=req.session.usuario;
	const { id } = req.params;
	const {password, correo, ...resto } = req.body;

	//Validar Todo Con la Base de Datos

	if (password) {
		//Encriptar contraseña
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}
	await Usuario.findByIdAndUpdate(id, resto);
/*
	res.json({
		usuario,
	});*/
	console.log('usuario actualizado');

	res.redirect('/usuarios');
};
const usuariosPatch = (req, res = response) => {
	res.json({
		msj: 'Patch API - controlador',
	});
};
const usuariosDelete = async (req, res = response) => {
	const { id } = req.params;

	//const uid = req.uid;

	//Borrar fisicamente el ususrio
	//const usuario = await Usuario.findByIdAndDelete(id);

	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.json({
		usuario,
	});
};

module.exports = {
	usuariosGet,
	usuariosGetId,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
	registrarUsuario,
};
