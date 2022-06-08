const { Router } = require('express');
const { check } = require('express-validator');

const { existeCalcinacionPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {crearMolino, obtenerMolinos} = require('../controllers/molinoControllers');


const router = Router();
//../Calcinacions listar
router.get('/etapaMolino',[validarJWT,], obtenerMolinos );
	//console.log('llego a Calcinacions routas');
//../Calcinacions :id 
/*router.get('/:id',[
	check('id', 'No es un Id de mongo valido').isMongoId(),
	check('id').custom(existeCalcinacionPorId),
	validarCampos,
], );*/
//../Calcinacions crear
router.post('/',[
	validarJWT,
	check('fecha_inicio', 'la fecha_inicio es obligatorio').not().isEmpty(),
	check('fecha_fin', 'la fecha_fin es obligatorio').not().isEmpty(),
	validarCampos,
	],
	crearMolino);

//../Calcinacions actualizar
//../Calcinacions borrar con Update - Admin

module.exports = router;
