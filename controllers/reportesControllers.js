const { response } = require('express');

const { Reporte } = require('../models');

const obtenerReportes = async (req, res = response) => {
	const { limite = 10, desde = 0 } = req.query;
	const query = { estado: true };
	const user=req.session.usuario;

	const [total, reportes] = await Promise.all([
		Reporte.countDocuments(query),
		Reporte.find(query)
			.populate('usuario', 'nombre')
			.skip(Number(desde))
			.limit(Number(limite)),
	]);

	res.json({
		total,
		reportes,
		user,
	});
};

const obtenerReporte = async (req, res = response) => {
	const { id } = req.params;
	const reporte = await Reporte.findById(id).populate('usuario', 'nombre');
	const user=req.session.usuario;

	res.json(reporte);
};

const crearReporte = async (req, res = response) => {
	const nombre = req.body.nombre.toUpperCase();
	const user=req.session.usuario;

	const reporteDB = await Reporte.findOne({ nombre });

	if (reporteDB) {
		return res.status(400).json({
			msg: `El reporte ${reporteDB.nombre}, ya existe`,
		});
	}

	// Generar la data a guardar
	const data = {
		nombre,
		usuario: req.usuario._id,
	};

	const reporte = new Reporte(data);

	// Guardar DB
	await reporte.save();

	res.status(201).json(reporte);
};

const actualizarReporte = async (req, res = response) => {
	const { id } = req.params;
	const { estado, usuario, ...data } = req.body;
	const user=req.session.usuario;

	data.nombre = data.nombre.toUpperCase();
	data.usuario = req.usuario._id;

	const reporte = await Reporte.findByIdAndUpdate(id, data, { new: true });

	res.json(reporte);
};

const borrarReporte = async (req, res = response) => {
	const user=req.session.usuario;

	const { id } = req.params;
	const reporteBorrado = await Reporte.findByIdAndUpdate(
		id,
		{ estado: false },
		{ new: true }
	);

	res.json(reporteBorrado);
};

module.exports = {
	crearReporte,
	obtenerReportes,
	obtenerReporte,
	actualizarReporte,
	borrarReporte,
};
