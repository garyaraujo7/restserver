const { response, request } = require('express');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const Role = require('../models/role');

const validarJWT = async (req = request , res = response, next) => {
	//console.log('x-token');
//	console.log(req.method);
//	console.log(req.url);
//	console.log(req.headers);
	const usuario = req.session.usuario;
	//const UsuariosN = usuario.nombre;
	if(usuario){
		next();
	}else{
		res.redirect("/login")
	}
	//UsuariosN.innerHTML;
	//console.log(UsuariosN);
	return;  // esto funciona

	
	const token = req.header('x-token');
	console.log(token);
	if (!token) {
		return res.status(401).json({
			msg: 'No hay token en la peticion',
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

		//leer usuario que corresponde al uid
		const usuario = await Usuario.findById(uid);

		//usuario no existe

		if (!usuario) {
			return res.status(401).json({
				msg: 'Token no valido - usuario no existe en DB',
			});
		}
		// verificar si el usuario esta activo
		if (!usuario.estado) {
			return res.status(401).json({
				msg: 'Token no valido - usuario inactivo',
			});
		}
		//localStorage.setItem("x-token", token);
		req.usuario = usuario;

		next();
	} catch (error) {
		console.log('TOKEN NO VALIDO');
		res.status(401).json({
			msg: 'Token no valido',
		});
	}
};
const isSuper = async(req,res,next)=>{
    const usuario = await Usuario.findById(req.usuario)
    const rol = await Role.find({_id:{$in: usuario.rol}})

	for(let i=0; i< rol.length; i++){
		if(rol[i].rol === "ROL_SUPERVISOR"){
			next();
			return;
		}
	}
	return res.status(403).json({message:"REQUIERE SER ROL SUPERVISOR"});
    //console.log(rol);
};
const isAdmin = async(req,res,next)=>{
    const usuario = await Usuario.findById(req.usuario)
    const rol = await Role.find({_id:{$in: usuario.rol}})

	for(let i=0; i< rol.length; i++){
		if(rol[i].rol === "ROL_ADMINISTRADOR"){
			next();
			return;
		}
	}
	return res.status(403).json({message:"REQUIERE SER ROL ADMINISTRADOR"});
    //console.log(rol);
};

module.exports = {
	validarJWT,
	//isSuper,
	//isAdmin,
};
