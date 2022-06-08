const { Router } = require('express');
const { check } = require('express-validator');
const { crearReporte, obtenerReportes, obtenerReporte, actualizarReporte, borrarReporte } = require('../controllers/reportesControllers');
const { existeReportePorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, isSuper, isAdmin } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

//../reportes listar

router.get('/listar',[
	validarJWT,
	
], obtenerReportes);
	//console.log('llego a Reportes routas');


//../reportes :id 

router.get('/listar/:id',[
	validarJWT,
	
	check('id', 'No es un Id de mongo valido').isMongoId(),
	check('id').custom(existeReportePorId),
	validarCampos,
], obtenerReporte);

//../reportes crear

router.post('/',
	[
		validarJWT,
		check('nombre', 'el nombre es obligatorio').not().isEmpty(),
		validarCampos,
	],
	crearReporte
);

//../reportes actualizar

router.put('/:id',[
	validarJWT,
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('id').custom( existeReportePorId),
	validarCampos,
],actualizarReporte );

//../reportes borrar con Update - Admin

router.delete('/:id',[ 
validarJWT,

check('id', 'No es un Id de mongo valido').isMongoId(),
check('id').custom( existeReportePorId),
validarCampos,
],borrarReporte);

module.exports = router;
