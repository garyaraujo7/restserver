const { response, request } = require('express');
const Balanza = require('../models/balanza');
const Usuario = require('../models/usuario');

const obtenerBalanzas = async (req = request, res = response) => {
	const user=req.session.usuario;
	
	const balanza = await Balanza.find();
	const total = await Balanza.countDocuments();
	//console.log('calcinacion total: ', calcinacion );
	//console.log('calcinacion total: ', total );

	res.render('reportesetapabalanza.ejs',{
		total,
		balanza,
		user,
	});
};/*
const obtenerCalcinacion = async (req, res = response) => {
	const { id } = req.params;
	
	const calcinacion = await Calcinacion.findById(id).populate('usuario', 'nombre');
	res.json(calcinacion);
};*/

const crearBalanza = async (req, res = response) => {
	//const { token } = req.params;
	// console.log(token);
	const user=req.session.usuario;

	const {fecha_inicio, hora_inicio, fecha_fin, hora_fin ,bolsas_procesadas, usuario} = req.body;
	//const calcinacio = new Calcinacion({ });
	// Generar la data a guardar
	/*const calcinacioninDB = await Calcinacion.findOne({fecha_inicio});
	const calcinacionfnDB = await Calcinacion.findOne({fecha_fin});
	if(calcinacioninDB){
		return res.status(400).json({
			msj:`La fecha,  ${calcinacioninDB.fecha_inicio}, de inicio ya fue usasda`
		});
	}
	if(calcinacionfnDB){
		return res.status(400).json({
			msj:`La fecha,  ${calcinacionfnDB.fecha_fin}, de fin ya fue usasda`
		});
	}*/
	const data = {
		fecha_inicio,
		hora_inicio,
		fecha_fin,
		hora_fin,
		bolsas_procesadas,
		usuario,
	//	usuario: req.usuario._id,
	};

	const balanza = new Balanza(data);
	// Guardar DB
	await balanza.save();
	//res.render("calcinacion.ejs");
	res.redirect('/balanza');
	//res.status(201).json();
};

module.exports = {
	crearBalanza,
	obtenerBalanzas,
};
