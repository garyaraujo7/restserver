const express = require('express');
const { reporteCalcinacionGetFecha } = require('../controllers/reporteSemanalControllers');
const { reporteMolinoGetFecha } = require('../controllers/reporteSemanalMolinoControllers');

const { obtenerTemperaturas_Horno, 
	obtenerAlertas_Horno 
} = require('../controllers/temperatura_hornoControllers');

const { obtenerTemperaturas_Molino, 
	obtenerAlertas_Molino 
} = require('../controllers/temperatura_molinoControllers');

const router = express.Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, isSuper, isAdmin } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const {reporteCiclo, crearCiclo, finCiclo }= require('../controllers/reporteCicloControllers')

router.get('/',[
//	validarJWT,
//	isSuper,
], (req, res) => {
	// console.log(__dirname)
	res.render('login.ejs', { titulo: 'mi titulo dinámico desde RoutasWEB' });
});
router.get('/home',[
		validarJWT,
		//isSuper,
	], (req, res) => {
		
		const user=req.session.usuario;
		// console.log(__dirname)
		res.render('index.ejs', { 
			user,
		});
	});
router.get('/calcinacion', [validarJWT,],(req, res, next) => {

	const user=req.session.usuario;


	res.render('calcinacion.ejs', {
		user,
	});
});

router.get('/reportestemperaturaH', [validarJWT,],obtenerTemperaturas_Horno );

router.get('/reportestemperaturaA',[validarJWT,], obtenerAlertas_Horno);

router.get('/molino',[validarJWT,], (req, res, next) => {
	const user=req.session.usuario;
	res.render('molino.ejs', { 
		user, });
});

router.get('/reportestemperaturaMolino',[validarJWT,], obtenerTemperaturas_Molino  );

router.get('/reportesAlertaMolino',[validarJWT,], obtenerAlertas_Molino);


router.get('/cinta',[validarJWT,], (req, res) => {
	const user=req.session.usuario;
	res.render('cinta.ejs', { 
		user,
 });
});

router.get('/balanza',[validarJWT,], (req, res) => {
	const user=req.session.usuario;
	res.render('balanza.ejs', {
		user,
	});
});
router.get('/reportes',[validarJWT,], (req, res) => {
	const user=req.session.usuario;
	// console.log(__dirname)
	res.render('reportes.ejs', { 
		user,
	});
});

router.get('/reportescalcinacion',[validarJWT,], (req, res, next) => {
	const user=req.session.usuario;
	res.render('reportesCalcinacion.ejs', {
		user,
	});
});

router.get('/reportesmolino', [validarJWT,],(req, res, next) => {
	const user=req.session.usuario;
	res.render('reportesMolino.ejs', {
		user,
	});
});


/*router.get('/reportesetapahorno', (req, res, next) => {
	res.render('reportesetapahorno.ejs', {
		hornos: 'Este es un mensaje dinámico de hornos',
	});
});*/
router.get('/registrarmprima',[validarJWT,], (req, res, next) => {
	const user=req.session.usuario;
	res.render('registrarmprima.ejs', {
		user,
	});
});
router.get('/reportesmprima',[validarJWT,], (req, res, next) => {
	const user=req.session.usuario;
	res.render('reportesmprima.ejs', {
		user,
	});
});
router.get('/registraralmacen',[validarJWT,], (req, res, next) => {
	const user=req.session.usuario;
	res.render('registraralmacen.ejs', {
		user,
	});
});
router.get('/reportesalmacen',[validarJWT,], (req, res, next) => {
	const user=req.session.usuario;
	res.render('reportesalmacen.ejs', {
		user,
	});
});
router.get('/infosemanalHorno/:id',[validarJWT,],reporteCalcinacionGetFecha );
router.get('/infosemanalHorno/:id',[validarJWT,],reporteCalcinacionGetFecha );
router.get('/infosemanalCiclo/' ,reporteCiclo );
router.get('/iniciociclo' , crearCiclo );
router.get('/finciclo' , finCiclo );

router.get('/desconectar', [validarJWT,], (req, res) => {
		req.session.destroy();
		res.redirect('../../');
});

module.exports = router;
