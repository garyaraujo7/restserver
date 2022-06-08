
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT,
        isAdmin,
        isSuper,
 } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const { esRolValido, 
        emailExiste, 
        existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch, 
        usuariosGetId,
        registrarUsuario
    } = require('../controllers/usuariosControllers');
    const Usuario = require('../models/usuario');

const router = Router();

router.get('/',[
    validarJWT,
    esAdminRole,
], usuariosGet);

router.get('/registrar',[
    validarJWT,
    esAdminRole,
], registrarUsuario);
//recuperar usuario
router.get('/editar/:id',[
    validarJWT,
    esAdminRole,
], usuariosGetId);

router.put('/editar/:id',[
    
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
   validarCampos
], usuariosPut);

router.post('/',[
    
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
    check('correo', 'el correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
   // check('rol', 'no es un rol valido').isIn(['ROL_ADMINISTRADOR','ROL_SUPERVISOR']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router; 