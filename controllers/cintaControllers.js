const { response, request } = require('express');
const Cinta_Transportadora = require('../models/cinta_transportadora');
const Usuario = require('../models/usuario');

const obtenerCinta_Transportadoras = async (req = request, res = response) => {
	const user=req.session.usuario;
	
	const cinta = await Cinta_Transportadora.find();
	const total = await Cinta_Transportadora.countDocuments();
	//console.log('calcinacion total: ', calcinacion );
	//console.log('calcinacion total: ', total );

	res.render('reportesetapacinta.ejs',{
		total,
		cinta,
		user,
	});
};
const obtenerCinta_Transportadora = async (req, res = response) => {
	const { id } = req.params;
	
	const calcinacion = await Cinta_Transportadora.findById(id).populate('usuario', 'nombre');
	res.json(calcinacion);
};

const crearCinta_Transportadora = async (req, res = response) => {
	//const { token } = req.params;
	// console.log(token);
	const user=req.session.usuario;

	const {tarea, fecha_inicio, hora_inicio, fecha_fin, hora_fin ,velocidad, usuario} = req.body;
	//const calcinacio = new Calcinacion({ });
	// Generar la data a guardar
	//const calcinacioninDB = await Cinta_Transportadora.findOne({fecha_inicio});
	//const calcinacionfnDB = await Cinta_Transportadora.findOne({fecha_fin});
	/*if(calcinacioninDB){
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
		tarea,
		fecha_inicio,
		hora_inicio,
		fecha_fin,
		hora_fin,
		velocidad,
		usuario,
	//	usuario: req.usuario._id,
	};

	const cinta = new Cinta_Transportadora(data);
	// Guardar DB
	await cinta.save();
	//res.render("calcinacion.ejs");
	res.redirect('/cinta');
	//res.status(201).json();
};

module.exports = {
	crearCinta_Transportadora,
	obtenerCinta_Transportadoras,
	
};
