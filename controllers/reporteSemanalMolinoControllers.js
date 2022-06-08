
const { response, request } = require('express');
const Temperatura_Molino = require('../models/temp_molino');
const Molino = require('../models/molino');
const Alerta_Molino = require('../models/alerta_molino');
const Usuario = require('../models/usuario');
const localStorage = require('local-storage');
const { localsName } = require('ejs');

const reporteMolinoGetFecha = async (req = request, res = response) => {

	const user=req.session.usuario;
	const {id} = req.params;  
	//const {id} = "6294d9f106f2189d4322b2d3";
	//const  {token}  = req.params;
    //const {usuario: userDB, token: tokenDB } = await token.json();
	//console.log('id', req.user);
    try {
       // const calcinacion = await Calcinacion.findOne({ _id: "6294e0cede9c7bcc74197004" });
        const molino = await Molino.findOne({ _id: id });
		//console.log(calcinacion);
		const totalC = await Temperatura_Molino.countDocuments( { 
			$and: [ 
				{ fecha: { $gte: molino.fecha_inicio } }, 
				{ fecha: { $lte: molino.fecha_fin } },
			] 
		} )
		const totalAb = await Temperatura_Molino.countDocuments( { 
			$and: [ 
				{ fecha: { $gte: molino.fecha_inicio } }, 
				{ fecha: { $lte: molino.fecha_fin } },
				{ alerta: {$eq: 'Baja'}}
			] 
		})
		const totalAad = await Temperatura_Molino.countDocuments( { 
			$and: [ 
				{ fecha: { $gte: molino.fecha_inicio } }, 
				{ fecha: { $lte: molino.fecha_fin } },
				{ alerta: {$eq: 'Adecuada'}}
			] 
		})
		const totalAal = await Temperatura_Molino.countDocuments( { 
			$and: [ 
				{ fecha: { $gte: molino.fecha_inicio } }, 
				{ fecha: { $lte: molino.fecha_fin } },
				{ alerta: {$eq: 'Alta'}}
			] 
		})
		const totalAp = await Temperatura_Molino.countDocuments( { 
			$and: [ 
				{ fecha: { $gte: molino.fecha_inicio } }, 
				{ fecha: { $lte: molino.fecha_fin } },
				{ alerta: {$eq: 'Peligro'}}
			] 
		})
		//console.log('Total',totalC);
	//	console.log('Baja',totalAb);
		//console.log('Adecuada',totalAad);
		//console.log('Alta',totalAal);
		//console.log('Peligo',totalAp);
        res.render("reporteSemanalMolino.ejs", {
			molino,
			totalC,
			totalAb,
			totalAad,
			totalAal,
			totalAp,
			user,
         //   usuarios
            //error: false,
            //mensaje1: "llego al render"
		});
		
    }catch (error) {
        console.log(error)
      //  res.render("usuarios.ejs", {
    //        error: true,
    //        mensaje: 'No se Encuentra el ID Seleccionado'
     //   })
    }
  //  const total = await Usuario.countDocuments();
};

const obtenerTemperaturas_Horno = async (req = request, res = response) => {

	//const { limite = 15, desde = 0 } = req.query;

	//usuariosControllers.js
	const temperatura_horno = await Temperatura_Molino.find();
	const total = await Temperatura_Molino.countDocuments();
	
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
	const totalc = await Temperatura_Molino.countDocuments( { $and: [ { fecha: { $gte: '2022-05-28' } }, { fecha: { $lte: '2022-05-30' } } ] } )
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
	});
};
const obtenerAlertas_Horno = async (req = request, res = response) => {
	
	const alerta_horno = await Alerta_Molino.find();
	const total = await Alerta_Molino.countDocuments();
	//console.log('calcinacion total: ', calcinacion );
	//console.log('calcinacion total: ', total );

	res.render('reportestemperaturaA.ejs',{
		total,
		alerta_horno,
	});
};
const obtenerTemperatura_Horno = async (req, res = response) => {
	const { id } = req.params;
	
	const calcinacion = await Molino.findById(id).populate('usuario', 'nombre');
	res.json(calcinacion);
};
const obtenerAlerta_Horno = async (req, res = response) => {
	const { id } = req.params;
	
	const calcinacion = await Molino.findById(id).populate('usuario', 'nombre');
	res.json(calcinacion);
};

module.exports = {
	reporteMolinoGetFecha,/*
	obtenerTemperaturas_Horno,
	obtenerAlertas_Horno,
	obtenerTemperatura_Horno,
	obtenerAlerta_Horno,*/
	//crearCalcinacion,
	//obtenerCalcinacion,
};
