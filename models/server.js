
const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');
//const ejs = require("ejs");
//const expressLayouts = require('express-ejs-layouts');
const { dbConnection } = require('../database/config');

const { SerialPort } = require('serialport');
const session= require('express-session');
const { ReadlineParser } = require('@serialport/parser-readline');
const { Temperatura_Horno } = require('.');
const  Temperatura_Molino  = require('../models/temp_molino');
const Alerta_Horno = require('../models/alerta_horno');
const Alerta_Molino = require('../models/alerta_molino');
//const { socketController } = require('../sockets/socket-controller');
//const { patch } = require('../routes/RoutesWeb');


class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.server = require('http').createServer(this.app);
		this.io = require('socket.io')(this.server);
		this.paths = {
			usuariosPath: '/usuarios',
			reportesPath: '/reportes',
			calcinacionPath: '/calcinacion',
			molinoPath: '/molino',
			cintaPath:'/cinta',
			balanzaPath:'/balanza',
			authPath: '/auth',
			index: '/',
		};

		//Conectar a base de datos
		this.conectarDB();

		// Middlewares
		this.middelewares();

		//Rutas de mi Aplicacion
		this.routes();
		//Socket
		this.sockets();

		// this.listen();
		//Arduino Port
		this.portCOM();
		//Arduino Molino
		this.portMolino();
		//Arduino CintaTransportadora
		this.portCinta();
		//Arduino Balanza
		this.portBalanza();
		//Arduino Conteo de bolsas
		this.portConteo();
	}
	async conectarDB() {
		await dbConnection();
	}

	middelewares() {
		//CORS
		this.app.use(cors());
		//sesion
		this.app.use(session({secret:"yesal"}));
		
		//Lectura y parseo del Boby
		

		//motor de pantillas

		//this.app.use(expressLayouts);
		this.app.set('view engine', 'ejs');
		this.app.set('views',__dirname + '../../views');

		//// Lectura y parseo del body
		this.app.use(express.json());
			this.app.use(bodyParser.urlencoded({ extends: true }));
			this.app.use(bodyParser.json());

		//direcctorio publico
	//	this.app.use(express.static('public'));
		this.app.use(express.static(__dirname + "../../public"));
	}

	routes() {
		this.app.use(this.paths.index, require('../routes/RoutesWeb'));
		this.app.use(this.paths.authPath, require('../routes/authRoutes'));
		this.app.use(this.paths.usuariosPath, require('../routes/usuariosRoutes'));
		this.app.use(this.paths.reportesPath, require('../routes/reportesRoutes'));
		this.app.use(this.paths.calcinacionPath, require('../routes/calcinacionesRoutes'));
		this.app.use(this.paths.molinoPath, require('../routes/molinoRoutes'));
		this.app.use(this.paths.cintaPath, require('../routes/cintaRoutes'));
		this.app.use(this.paths.balanzaPath, require('../routes/balanzaRoutes'));
		//this.app.use(this.usuariosPos, require ('../routes/usuariosRoutes'));
		

		this.app.use((req, res, next) => {
			res.status(404).render('404.ejs', {
				titulo: '404',
				descripcion: 'mensaje 404 desde el /models/server.js',
			});
		});
	}
	sockets() {
		this.io.on('connection',  () => {
			//const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
			//console.log('Cliente conectado', socket.id );
			//console.log(socket.handshake.headers['x-token']);
		});
		this.io.on('disconnect',  () => {
				//console.log('Cliente Desconectado', socket.id);
				//console.log('Cliente Desconectado');
		});
	}
	//Puerto COM Horno
	portCOM() {
		const portCOM = new SerialPort({
			path: 'COM14',
			baudRate: 9600,
			autoOpen: false,
		});
		portCOM.open(function (err) {
			if (err) {
				return console.log('Error Horno:', err.message);
			}
			console.log('Horno Port:', portCOM.path);
		});
		const parser = portCOM.pipe(new ReadlineParser({ delimiter: '\r\n' }));

		parser.on('data', (data) => {
			let ifecha = new Date();
			let fecha = 
			ifecha.getFullYear()+'-'+
			String(ifecha.getMonth() + 1).padStart(2, '0')+'-'+ 
			String(ifecha.getDate()).padStart(2, '0');
			//let temp = data;
			var temp_horno = parseInt(data, 10);
			//console.log(fecha);
			var baja = "Baja";
			var adecuada = "Adecuada";
			var alta= "Alta";	
			var peligro = "Peligro";
			var alerta = "";
			//console.log(alerta);
			if(  temp_horno > 0 && temp_horno < 25){
				//Controlar tiempo segun diagrama de Fluejo Taty
				alerta = baja;
				const datosT = {
					fecha,
					temp_horno,
					alerta,
				};
				const temperatura_horno = Temperatura_Horno(datosT);
				const alerta_horno = Alerta_Horno(datosT);
				//console.log(temperatura_horno);
				//console.log('Alerta', alerta_horno);
				temperatura_horno.save(); 
				alerta_horno.save(); 
				// console.log("entro a baja"); grabar alerta 
				}else {
				  if( temp_horno > 25 && temp_horno < 45 ){
					//console.log("entro a adecuada");
					alerta=adecuada;
					const datosT = {
						fecha,
						temp_horno,
						alerta,
					};
					const temperatura_horno = Temperatura_Horno(datosT);
					//const alerta_horno = Alerta_Horno(datosT);
					//alerta_horno.save(); 
					//console.log(temperatura_horno);
					temperatura_horno.save();
				  }else{
					if( temp_horno > 45 && temp_horno < 50 ){
					  //console.log("entro a Alta");
	         		    alerta=alta;
						const datosT = {
							fecha,
							temp_horno,
							alerta,
						};
						const temperatura_horno = Temperatura_Horno(datosT);
						const alerta_horno = Alerta_Horno(datosT);
						alerta_horno.save(); 
						//console.log(temperatura_horno);
						temperatura_horno.save();
					}
					else{
					  if( temp_horno > 50 ){
					   //console.log("entro a Peligro");
					    alerta=peligro;
						const datosT = {
							fecha,
							temp_horno,
							alerta,
						};
						const temperatura_horno = Temperatura_Horno(datosT);
//						console.log(temperatura_horno);
						temperatura_horno.save();
						const alerta_horno = Alerta_Horno(datosT);
						alerta_horno.save(); 
					  }
					}
				  }
				}

			//const datosT = {
			//	fecha,
			//	temp_horno,
			//	alerta,
			//};
			//const temperatura_horno = Temperatura_Horno(datosT);
			//temperatura_horno.save();
			//console.log(data.toString());
			//let temps = document.getElementById('temperature');
			//console.log(temp_horno);
			//const temperatura_horno = Temperatura_Horno(datosT);
			//console.log(temperatura_horno);
			//temperatura_horno.save();
			/*			

			//console.log("fecha :", fecha, " Temperatura de :", data, "ºC" )
			//	const temp = Temperatura_Horno(data);
			//const calcinacion = new Calcinacion(data);
				// Guardar DB
			//	 temp.save();
			let date = new Date();
			let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
			console.log(output);
			console.log(data)
			console.log("fecha :", output, " Temperatura de :", data, "ºC" )
*/
			//console.log(data.toString());
			//var temp = parseInt(data, 10) + " °C";
			//let temps = document.getElementById('temperature');
			//console.log(temp);
			this.io.emit('arduino:data', {
				value: data.toString(),
			});
		}); 
		//parser.on('data', (data) => {
		//  
		//  this.io.emit('temp', data)
		//});
		/*
        parser.on('data', (data) => {
            var temp = parseInt(data, 10) + " °C";
            console.log(temp);
            //this.io.emit('temp', data)
        });
		*/
	}
	//Puerto COM Molino
	portMolino() {
		const portMolino = new SerialPort({
			path: 'COM3',
			baudRate: 9600,
			autoOpen: false,
		});
		portMolino.open(function (err) {
			if (err) {
				return console.log('Error Molino: ', err.message);
			}
			console.log('Molino Port:', portMolino.path);
		});
		const parsera = portMolino.pipe(new ReadlineParser({ delimiter: '\r\n' }));

		parsera.on('data', (data) => {
			let ifecha = new Date();
			let fecha = 
			ifecha.getFullYear()+'-'+
			String(ifecha.getMonth() + 1).padStart(2, '0')+'-'+ 
			String(ifecha.getDate()).padStart(2, '0');
			//var temp_molino = 60; //Valor Seleccionado
			var temp_molino = parseInt(data, 10);
			//console.log(fecha);
			var adecuada = "Adecuada";
			var alta= "Alta";	
			var peligro = "Peligro";
			var alerta = "";
			//console.log(alerta);
			if(  temp_molino > 0 && temp_molino < 40){
				alerta = adecuada;
				const datosT = {
					fecha,
					temp_molino,
					alerta,
				};
				const temperatura_molino = Temperatura_Molino(datosT);
				//const alerta_molino = Alerta_Molino(datosT);
				temperatura_molino.save(); 
//				alerta_molino.save(); 
				}else {
				  if( temp_molino > 40 && temp_molino < 50 ){
					alerta=alta;
					const datosT = {
						fecha,
						temp_molino,
						alerta,
					};
					const temperatura_molino = Temperatura_Molino(datosT);
					const alerta_molino = Alerta_Molino(datosT);
				temperatura_molino.save(); 
				alerta_molino.save(); 
				  }else{
					if( temp_molino > 50 && temp_molino < 55 ){
	         		    alerta=peligro;
						const datosT = {
							fecha,
							temp_molino,
							alerta,
						};
						const temperatura_molino = Temperatura_Molino(datosT);
						const alerta_molino = Alerta_Molino(datosT);
						temperatura_molino.save(); 
						alerta_molino.save(); 
					}
					else{
					  if( temp_molino > 55 ){
					    alerta="Error";
						const datosT = {
							fecha,
							temp_molino,
							alerta,
						};
						const alerta_molino = Alerta_Molino(datosT);
						const temperatura_molino = Temperatura_Molino(datosT);
						temperatura_molino.save(); 
						alerta_molino.save(); 
					  }
					}
				  }
				}
			this.io.emit('molino:data', {
				value: data.toString(),
			});
			
		});
	}
		//Puerto COM CintaTransportadora
	portCinta() {
		const portCinta = new SerialPort({
			path: 'COM15',
			baudRate: 9600,
			autoOpen: false,
		});
		portCinta.open(function (err) {
			if (err) {
				return console.log('Error CintaTrs:', err.message);
			}
			console.log('Cinta Port:', portCinta.path);
		});
		const parsera = portCinta.pipe(new ReadlineParser({ delimiter: '\r\n' }));
		parsera.on('data', (data) => {
			
			//console.log(data);
			this.io.emit('cinta:data', {
				value: data.toString(),
			});
			
		});
	}
	//Puerto COM Balanza
	portBalanza() {
		const portBalanza = new SerialPort({
			path: 'COM16',
			baudRate: 9600,
			autoOpen: false,
		});
		portBalanza.open(function (err) {
			if (err) {
				return console.log('Error Balanza:', err.message);
			}
			console.log('Balanza Port:', portBalanza.path);
		});
		const parsera = portBalanza.pipe(new ReadlineParser({ delimiter: '\r\n' }));
		parsera.on('data', (data) => {
			
			//console.log(data)
			this.io.emit('balanza:data', {
				value: data.toString(),
			});
		});
	}
	//Puerto COM Contador de Bolsas
	portConteo() {
		const portConteo = new SerialPort({
			path: 'COM17',
			baudRate: 9600,
			autoOpen: false,
		});
		portConteo.open(function (err) {
			if (err) {
				return console.log('Error Contador:', err.message);
			}
			console.log('Contador Port :', portConteo.path);
		});
		const parsera = portConteo.pipe(new ReadlineParser({ delimiter: '\r\n' }));
		parsera.on('data', (data) => {
			//console.log(data)
			this.io.emit('contador:data', {
				value: data.toString(),
			});
			
		});
	}
	

	listen() {
		this.server.listen(this.port, () => {
			console.log('Servidor corriendo en puerto ', this.port);
		});
	}
}

module.exports = Server;