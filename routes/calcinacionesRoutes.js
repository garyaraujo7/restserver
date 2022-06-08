const { Router } = require('express');
const { check } = require('express-validator');

const { existeCalcinacionPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearCalcinacion,  
		obtenerCalcinacion,
		obtenerCalcinaciones 
	} = require('../controllers/calcinacionesControllers');


const router = Router();
//../Calcinacions listar
router.get('/etapahorno', [validarJWT,],obtenerCalcinaciones);
	//console.log('llego a Calcinacions routas');
//../Calcinacions :id 
router.get('/:id',[
	validarJWT,
	check('id', 'No es un Id de mongo valido').isMongoId(),
	check('id').custom(existeCalcinacionPorId),
	validarCampos,
], obtenerCalcinacion);
//../Calcinacions crear
router.post('/',[
	validarJWT,
	check('fecha_inicio', 'la fecha_inicio es obligatorio').not().isEmpty(),
	check('fecha_fin', 'la fecha_fin es obligatorio').not().isEmpty(),
	validarCampos,
	],
	crearCalcinacion);

//../Calcinacions actualizar
//../Calcinacions borrar con Update - Admin

module.exports = router;
