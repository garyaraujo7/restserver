const { response, request } = require('express');
const Temperatura_Molino = require('../models/temp_molino');
const Alerta_Molino = require('../models/alerta_molino');
const Usuario = require('../models/usuario');

const obtenerTemperaturas_Molino = async (req = request, res = response) => {

	//const { limite = 15, desde = 0 } = req.query;
	const user=req.session.usuario;

	//usuariosControllers.js
	const temperatura_molino = await Temperatura_Molino.find();
	const total = await Temperatura_Molino.countDocuments();
	//console.log('calcinacion total: ', calcinacion );
	//console.log('calcinacion total: ', total );
	/*const [total, temperatura_horno] = await Promise.all([
		Temperatura_Horno.countDocuments(),
		Temperatura_Horno.find().skip(Number(desde)).limit(Number(limite)),
	]);*/
	res.render('reportestemperaturaMolino.ejs',{
		total,
		temperatura_molino,
		user,
	});
};
const obtenerAlertas_Molino = async (req = request, res = response) => {
	const user=req.session.usuario;
	
	const alerta_molino = await Alerta_Molino.find();
	const total = await Alerta_Molino.countDocuments();
	//console.log('calcinacion total: ', calcinacion );
	//console.log('calcinacion total: ', total );

	res.render('reportesAlertaMolino.ejs',{
		total,
		alerta_molino,
		user,
	});
};
const obtenerTemperatura_Horno = async (req, res = response) => {
	const { id } = req.params;
	
	const calcinacion = await Calcinacion.findById(id).populate('usuario', 'nombre');
	res.json(calcinacion);
};
const obtenerAlerta_Horno = async (req, res = response) => {
	const { id } = req.params;
	
	const calcinacion = await Calcinacion.findById(id).populate('usuario', 'nombre');
	res.json(calcinacion);
};

module.exports = {
	obtenerTemperaturas_Molino,
	obtenerAlertas_Molino,	
	//crearCalcinacion,
	//obtenerCalcinacion,
};
