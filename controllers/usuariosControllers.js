const {response} = require('express');

const bcryptjs = require ( 'bcryptjs');

const Usuario = require('../models/usuario');
const { request } = require('express');



const usuariosGet = async (req = request, res = response) => {

    //const {q, nombre = 'no name' } = req.query;
    const {limite = 1, desde = 0 } = req.query;
    const query = {estado: true};

    /*const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query);

    res.json({
        total,
        usuarios 
    });*/

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number(desde))
            .limit( Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });

}

const usuariosPost = async(req, res = response) => {

   
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await usuario.save();
    
    res.json({
        usuario 
    });
}
const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    const { password, google, correo, ...resto }=req.body;

    //Validar Todo Con la Base de Datos

    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto );


    res.json({
        msj: 'Put API - controlador',
        usuario
    });
}
const usuariosPatch = (req, res = response) => {

    res.json({
        msj: 'Patch API - controlador'
    });
}
const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;
    //Borrar fisicamente el ususrio
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}