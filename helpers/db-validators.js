const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async (rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if( !existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}

const emailExiste = async (correo = '')=>{

    //Verificar si el  cooreo existe

    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error(`El correo: ${correo} ya ESTA REGISTRADA`)
    }
}

const existeUsuarioPorId = async (id)=>{

    //Verificar si existe el id de usuario

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`El id: ${ id }  no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}