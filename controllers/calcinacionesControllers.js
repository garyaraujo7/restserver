const { response, request } = require('express');
const Calcinacion = require('../models/calcinacion');
const Molino = require('../models/molino');

const Usuario = require('../models/usuario');

const obtenerCalcinaciones = async (req = request, res = response) => {
	const user=req.session.usuario;
	
	const calcinacion = await Calcinacion.find(); //Obtiene Todo en orden natural 
	//const calcinacion = await Calcinacion.find().sort({$natural:-1}); //Obtiene Todo en orden Inverso 
	//const calcinacion = await Calcinacion.find().sort({$natural: -1}).limit(3); //Obtiene Todo en orden inverso y cantidad 
	const total = await Calcinacion.countDocuments();
	//const total = await Calcinacion.countDocuments( { fecha_fin: { $in: [ '2022-05-02', '2022-05-04' ] }}, { limit: 100 })
	//const calcinacion = await Calcinacion.find( { fecha_inicio: { $in: [ '2022-05-02', '2022-05-04' ] }})
	//const total = await Calcinacion.countDocuments( { usuario: { $eq: 'Tatysss' }}).hint( { $natural : -1 }, {fecha_inicio: '2022-05-02'}).limit(3);
	//const total = await Molino.countDocuments();
	//const total = await Calcinacion.countDocuments( { usuario : { $gt: ('Usuario') } }, { limit: 5 } )
	/*
	db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
	db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
	db.inventory.find( {
		$and: [
			{ $or: [ { qty: { $lt : 10 } }, { qty : { $gt: 50 } } ] },
			{ $or: [ { sale: true }, { price : { $lt : 5 } } ] }
		]
	} )	
	*/
	/*
	const tota = await Calcinacion.countDocuments({$and: [{
		fecha_inicio :
			{$lt: '2022-05-05' },
		usuario:
			{$eq: 'Usuario'}
		}]} 		
	).hint( { $natural : -1 } ).limit(2);*/
/*	const tota = await Calcinacion.aggregate([  { age: 1 }
		{
		  $match: { usuario: 'Tatysss' }
		},
		{
		  $count: { $sum: 1 }
		}
	  ]);
*/

	//const total = tota;
	//db.micoleccion.find().sort({$natural:-1}).limit(1);
	//console.log('calcinacion total: ', calcinacion );
	//console.log('Consulta: ', total );

	res.render('reportesetapahorno.ejs',{
		total,
		calcinacion,
		user,
	});
};
const obtenerCalcinacion = async (req, res = response) => {
	const user=req.session.usuario;

	const { id } = req.params;
	
	const calcinacion = await Calcinacion.findById(id).populate('usuario', 'nombre');
	res.json(calcinacion);
};

const crearCalcinacion = async (req, res = response) => {
	const user=req.session.usuario;

	//const { token } = req.params;
	// console.log(token);
	const {fecha_inicio, hora_inicio, fecha_fin, hora_fin , usuario} = req.body;
	// Generar la data a guardar
	const calcinacioninDB = await Calcinacion.findOne({fecha_inicio});
	const calcinacionfnDB = await Calcinacion.findOne({fecha_fin});
	if(calcinacioninDB){
		return res.status(400).json({
			msj:`Horno en Funcionamiento Inicio ERROR `
		});
	}
	if(calcinacionfnDB){
		return res.status(400).json({
			msj:`Horno en Funcionamiento FIN ERROR`
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
	const calcinacion = new Calcinacion(data);
	// Guardar DB
	await calcinacion.save();
	//res.render("calcinacion.ejs");
	res.redirect('/calcinacion');
	//res.status(201).json();
};
module.exports = {
	obtenerCalcinaciones,
	crearCalcinacion,
	obtenerCalcinacion,
};
