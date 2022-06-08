const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Reporte = require('../models/reporte');

const esRolValido = async (rol = '') => {
	const existeRol = await Role.findOne({ rol });
	if (!existeRol) {
		throw new Error(`El rol ${rol} no esta registrado en la DB`);
	}
};

const emailExiste = async (correo = '') => {
	//Verificar si el  cooreo existe

	const existeEmail = await Usuario.findOne({ correo });
	if (existeEmail) {
		throw new Error(`El correo: ${correo} ya ESTA REGISTRADO`);
	}
};

const existeUsuarioPorId = async (id) => {
	//Verificar si existe el id de usuario

	const existeUsuario = await Usuario.findById(id);
	if (!existeUsuario) {
		throw new Error(`El id no existe : ${id}`);
	}
};

const existeReportePorId = async (id) =>{

	const existeReporte = await Reporte.findById(id);
	if(!existeReporte){
		throw new Error(`no existe El id:   ${id}`);
	}
};
const existeCalcinacionPorId = async (id) =>{

	const existeCalcinacion = await Calcinacion.findById(id);
	if(!existeCalcinacion){
		throw new Error(`no existe El id:   ${id}`);
	}
}


module.exports = {
	esRolValido,
	emailExiste,
	existeUsuarioPorId,
	existeReportePorId,
	existeCalcinacionPorId,
};
