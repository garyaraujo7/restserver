const { response, request } = require('express');

const Calcinacion = require('../models/calcinacion');
const Temperatura_Horno = require('../models/temp_horno');
const Alerta_Horno = require('../models/alerta_horno');

const Molino = require('../models/molino');
const Temperatura_Molino = require('../models/temp_molino');
const Alerta_Molino = require('../models/alerta_molino');

const Cinta_Transportadora = require('../models/cinta_transportadora');

const Balanza = require('../models/balanza');

const Usuario = require('../models/usuario');

const Ciclo = require('../models/ciclo');

const obtenerCiclos = async (req = request, res = response) => {
	const user=req.session.usuario;	
	const calcinacion = await Calcinacion.find(); //Obtiene Todo en orden natural 
	const total = await Calcinacion.countDocuments();

	res.render('reportesetapahorno.ejs',{
		total,
		calcinacion,
		user,
	});
};

const crearCiclo = async (req, res = response) => {
	const user=req.session.usuario;

	//const { token } = req.params;
	// console.log(token);
	//const {fecha_inicio, hora_inicio, fecha_fin, hora_fin , usuario} = req.body;
	// Generar la data a guardar
	let ifecha = new Date();
	let ffecha = new Date();
	let ciclo_inicio = 
		ifecha.getFullYear()+'-'+
		String(ifecha.getMonth() + 1).padStart(2, '0')+'-'+ 
		String(ifecha.getDate()).padStart(2, '0')
	;
	let ciclo_fin = 
		ifecha.getFullYear()+'-'+
		String(ifecha.getMonth() + 1).padStart(2, '0')+'-'+ 
		String(ifecha.getDate()).padStart(2, '0')
	;
	console.log(user.nombre);
	const usuario = user.nombre;
	//const calcinacioninDB = await Calcinacion.findOne({fecha_inicio});
	//const calcinacionfnDB = await Calcinacion.findOne({fecha_fin});	
	const data = {
		ciclo_inicio,
		ciclo_fin,
		usuario,
	//	usuario: req.usuario._id,
	};
	console.log(data);
	const ciclo = new Ciclo(data);
	// Guardar DB
	await ciclo.save();
	//res.render("calcinacion.ejs");
	res.redirect('../home');
	//res.status(201).json();
};
const finCiclo = async (req, res = response) => {

	const ciclo = await Ciclo.find().sort({$natural: -1}).limit(1); //Obtiene Todo en orden inverso y cantidad 
	const user=req.session.usuario;	
	const {ciclo_inicio, ciclo_fin, ...resto} = ciclo;
	
	console.log('base',ciclo);
	var c_id = ciclo._id;
	console.log('id',ciclo._id);
	console.log('fi',ciclo.ciclo_inicio);
	console.log('user',ciclo.usuario);
	
	console.log(c_id)
	//const ciclo_inicio =  ciclo.ciclo_inicio;
	let ffecha = new Date();
	let uciclo_fin = 
		ffecha.getFullYear()+'-'+
		String(ffecha.getMonth() + 1).padStart(2, '0')+'-'+ 
		String(ffecha.getDate()).padStart(2, '0')
	;
	const usuario = user.nombre;
	const data = {
		//ciclo_inicio,
		ciclo_fin,
		usuario,
	//	usuario: req.usuario._id,
	};


	//console.log('data',data);
	
	//const { id } = req.params;
	//const {password, correo, ...resto } = req.body;

	//Validar Todo Con la Base de Datos
/*	var user_id = '5eb985d440bd2155e4d788e2';
User.findByIdAndUpdate(user_id, { name: 'Gourav' },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
    }
});*/

	//await Ciclo.findByIdAndUpdate(ciclo._id, ciclo_fin, usuario);

	console.log('usuario actualizado');

	res.redirect('../home');
};

const reporteCiclo = async (req = request, res = response) => {
	
	res.render('reportesCiclo.ejs',{
	//	total,
	//	calcinacion,
		//user,
	});
};


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
module.exports = {
	reporteCiclo,
	crearCiclo,
	finCiclo,
	//obtenerCalcinaciones,
	//crearCalcinacion,
	//obtenerCalcinacion,
};
