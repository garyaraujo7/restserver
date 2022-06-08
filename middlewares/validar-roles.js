const { response } = require('express');

const esAdminRole = (req, res = response, next) => {
	
	const usuario = req.session.usuario;
	//const UsuariosN = usuario.nombre;
	/*if(usuario){
		next();
	}else{
		res.redirect("/login")
	}*/
	
	if (!usuario) {
		return res.status(500).json({
			msg: 'Se quiere verificar el rol sin validar el token primero',
		});
	}
	const { rol, nombre } = usuario;
	if (rol !== 'ROL_ADMINISTRADOR') {
		return res.status(401).json({
			msg: `${nombre} no es administrador - no puede hacer esto`,
		});
	}
	next();
};
const esSuperRole = (req, res = response, next) => {

	const usuario = req.session.usuario;

	if (!usuario) {
		return res.status(500).json({
			msg: 'Se quiere verificar el rol sin validar el token primero',
		});
	}
	const { rol, nombre} = usuario;
	if (rol !== 'ROL_SUPERVISOR') {
		return res.status(401).json({
			msg: `${nombre} no es SUPERVISOR - no puede hacer esto`,
		});
	}
	next();
};
module.exports = {
	esAdminRole,
	esSuperRole,
};
