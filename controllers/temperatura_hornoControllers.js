const { response, request } = require('express');
const Temperatura_Horno = require('../models/temp_horno');
const Alerta_Horno = require('../models/alerta_horno');
const Usuario = require('../models/usuario');

const obtenerTemperaturas_Horno = async (req = request, res = response) => {

	//const { limite = 15, desde = 0 } = req.query;
	const user=req.session.usuario;

	//usuariosControllers.js
	const temperatura_horno = await Temperatura_Horno.find();
	const total = await Temperatura_Horno.countDocuments();
	
	//////////#######################
	//const calcinacion = await Temperatura_Horno.find().sort({$natural:-1}); //Obtiene Todo en orden Inverso 
	//const calcinacion = await Temperatura_Horno.find().sort({$natural: -1}).limit(3); //Obtiene Todo en orden inverso y cantidad 
	//const total = await Temperatura_Horno.countDocuments();
	//const total = await Temperatura_Horno.countDocuments( { fecha_fin: { $in: [ '2022-05-02', '2022-05-04' ] }}, { limit: 100 })
	//const totalc = await Temperatura_Horno.countDocuments( { fecha: { $in: [ '2022-05-28', '2022-05-30' ] }})
	//const total = await Temperatura_Horno.countDocuments( { usuario: { $eq: 'Tatysss' }}).hint( { $natural : -1 }, {fecha_inicio: '2022-05-02'}).limit(3);
	//const total = await Molino.countDocuments();
	//const totalc = await Temperatura_Horno.countDocuments( { fecha : { $eq: ('2022-05-29') } }) //para sacar el exedente
//const totalc = await Temperatura_Horno.countDocuments( { fecha : { $eq: ('2022-05-29') } }) //para sacar el exedente

	
	//db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
	const totalc = await Temperatura_Horno.countDocuments( { $and: [ { fecha: { $gte: '2022-05-28' } }, { fecha: { $lte: '2022-05-30' } } ] } )
/*	const totalc = await Temperatura_Horno.countDocuments( {
		$and: [
			{ $or: [ { fecha: { $lt : 10 } }, { fecha : { $gt: 50 } } ] },
			{ $or: [ { fecha: true }, { fecha : { $gt : 5 } } ] }
		]
	} )	
*/
/*	
	const totalc = await Temperatura_Horno.countDocuments({$and: [{
		fecha:
			{$eq: '2022-05-28'},
		alerta:
			{$eq: 'Adecuada'}
		}]} 		
	).hint( { $natural : -1 } );*///.limit(2)
/*	const tota = await Temperatura_Horno.aggregate([  { age: 1 }
		{
		  $match: { usuario: 'Tatysss' }
		},
		{
		  $count: { $sum: 1 }
		}
	  ]);
*/
	//////////#######################

	console.log('calcinacion consultas: ', totalc );
	console.log('calcinacion total: ', total );
	//console.log('calcinacion total: ', total );
	/*const [total, temperatura_horno] = await Promise.all([
		Temperatura_Horno.countDocuments(),
		Temperatura_Horno.find().skip(Number(desde)).limit(Number(limite)),
	]);*/
	res.render('reportestemperaturaH.ejs',{
		total,
		temperatura_horno,
		user,
	});
};
const obtenerAlertas_Horno = async (req = request, res = response) => {
	const user=req.session.usuario;
	
	const alerta_horno = await Alerta_Horno.find();
	const total = await Alerta_Horno.countDocuments();
	//console.log('calcinacion total: ', calcinacion );
	//console.log('calcinacion total: ', total );

	res.render('reportestemperaturaA.ejs',{
		total,
		alerta_horno,
		user,
	});
};
const obtenerTemperatura_Horno = async (req, res = response) => {
	const { id } = req.params;
	const user=req.session.usuario;
	
	const calcinacion = await Calcinacion.findById(id).populate('usuario', 'nombre');
	res.json(calcinacion);
};
const obtenerAlerta_Horno = async (req, res = response) => {
	const { id } = req.params;
	const user=req.session.usuario;
	
	const calcinacion = await Calcinacion.findById(id).populate('usuario', 'nombre');
	res.json(calcinacion);
};

module.exports = {
	obtenerTemperaturas_Horno,
	obtenerAlertas_Horno,
	//obtenerTemperatura_Horno,
	//obtenerAlerta_Horno,
	//crearCalcinacion,
	//obtenerCalcinacion,
};
