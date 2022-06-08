const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {
        
    const {correo, password} = req.body;
    try {
        //Verificar Email
        const usuario = await Usuario.findOne({correo});
       // console.log(usuario);
        if(!usuario){ 
          //  mensaje.style.display = 'none';
          console.log('correro malo');
          return res.status(400).json({
            msg: 'Correo Invalido'
            });
        }
        //Usuario Activo
        if(!usuario.estado){ 
            //mensaje.style.display = 'none';
            return res.status(400).json({
                msg: 'Correo Inactivo'
            });
        }
        //Verificar Contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password); 
        if(!validPassword){
            return res.status(400).json({
               msg: 'Contraseña Erronea'
            });
        }
        
        //Generar JWT
       const token = await generarJWT ( usuario.id);
       //  console.log(token);
      req.session.usuario=usuario;
       //console.log(usuario);
      //  localStorage.getItem("x-token", token);

       //console.log('Login Correcto');
      //  res.redirect('/');
       //console.log(usuario);
        
        res.json({
        //msg: 'Login ok',
            usuario,
            token,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Comuniquese con el administrador Administrador'
        });
    }
}
/*
const loginn = async (req, res = response) =>{
    const {token} = req.body;
    res.json({
        msg: 'todo ok token',
        token
    })
}*/
const renovarToken = async( req, res = response ) =>{
return;
    const { usuario } = req;

   //  Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
        usuario,
        token
    })
}
module.exports = {
    login,
    //loginup,
   // loginn,    
    renovarToken,
}