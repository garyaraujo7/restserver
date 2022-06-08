const { response, request } = require('express');
const Molino = require('../models/molino');
const Usuario = require('../models/usuario');

const obtenerMolinos = async (req = request, res = response) => {
	const user=req.session.usuario;
	
	const molino = await Molino.find();
	const total = await Molino.countDocuments();
	//console.log('calcinacion total: ', calcinacion );
	//console.log('calcinacion total: ', total );

	res.render('reportesetapamolino.ejs',{
		total,
		molino,
		user,
	});
};
const obtenerMolino = async (req, res = response) => {
	const { id } = req.params;
	const user=req.session.usuario;
	
	const molino = await Molino.findById(id).populate('usuario', 'nombre');
	res.json(molino);
};

const crearMolino = async (req, res = response) => {
	//const { token } = req.params;
	// console.log(token);
	const user=req.session.usuario;

	const {fecha_inicio, hora_inicio, fecha_fin, hora_fin , usuario} = req.body;
	//const calcinacio = new Calcinacion({ });
	// Generar la data a guardar
	const molinoinDB = await Molino.findOne({fecha_inicio});
	const molinofnDB = await Molino.findOne({fecha_fin});
	if(molinoinDB){
		return res.status(400).json({
			msj:`La fecha,  ${molinoinDB.fecha_inicio}, de inicio ya fue usasda`
		});
	}
	if(molinofnDB){
		return res.status(400).json({
			msj:`La fecha,  ${molinofnDB.fecha_fin}, de fin ya fue usasda`
		});
	}
	const data = {
		fecha_inicio,
		hora_inicio,
		fecha_fin,
		hora_fin,
		usuario,
	//	usuario: req.usuario._id,
	};

	const molino = new Molino(data);
	// Guardar DB
	await molino.save();
	//res.render("calcinacion.ejs");
	res.redirect('/molino');
	//res.status(201).json();
};

module.exports = {
	obtenerMolinos,
	crearMolino,
	obtenerMolino,
};
