const {response} = require('express');

const usuariosGet = (req, res = response) => {

    const {q, nombre = 'no name' } = req.query;

    res.json({
        msj: 'Get API - controlador',
        q,
        nombre
    });
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msj: 'Post API - controlador',
        nombre,
        edad
    });
}
const usuariosPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msj: 'Put API - controlador',
        id
    });
}
const usuariosPatch = (req, res = response) => {

    res.json({
        msj: 'Patch API - controlador'
    });
}
const usuariosDelete = (req, res = response) => {

    res.json({
        msj: 'Delete API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}