const { Router } = require('express');
const { check } = require('express-validator');

const { login, loginup , loginn, renovarToken } = require('../controllers/authControllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*router.get('/', 
	loginup
);*/
/*router.get('/loginn', 
	loginn
);*/

router.post(
	'/login',
	[
		//check('x-token', 'No lleva Token y es obligatorio').not().isEmpty(),
		check('correo', 'El correo es obligatorio').isEmail(),
		check('password', 'La contraseña  es obligatorio').not().isEmpty(),
		validarCampos,
	],
	login
);
/*router.post(
	'/loginn',
	[
		check('x-token', 'No lleva Token y es obligatorio').not().isEmpty(),
	//	check('correo', 'El correo es obligatorio').isEmail(),
	//	check('password', 'La contraseña  es obligatorio').not().isEmpty(),
		validarCampos,
	],
	loginn
);*/
router.get('/', validarJWT, renovarToken );

module.exports = router;