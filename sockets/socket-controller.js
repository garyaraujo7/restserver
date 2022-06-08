/*const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers/generar-jwt');
const { isSuper, validarJWT } = require('../middlewares/validar-jwt');
//const { ChatMensajes } = require('../models');

//const chatMensajes = new ChatMensajes();

const socketController = async( socket = new Socket() ) => {
   // console.log('llego aqui');
     const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
     if ( !usuario ) {
         console.log('desconectado por usuario ');
         return socket.disconnect();
     }
    /* const jwt = await validarJWT(socket.handshake.headers['x-token']);
     if ( !jwt ) {
        console.log('desconectado por jwt');
        return socket.disconnect();
    }
     const rol = await isSuper(socket.handshake.headers['x-token']);
     if ( !rol ) {
        console.log('desconectado por rol ');
        return socket.disconnect();
    }
    */
    // console.log('Se conecto ', usuario.nombre);

   //  console.log(socket.handshake.headers['x-token'])
//}
/*
const socketController = async( socket = new Socket(), io ) => {

    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    if ( !usuario ) {
        return socket.disconnect();
    }

    // Agregar el usuario conectado
    chatMensajes.conectarUsuario( usuario );
    io.emit('usuarios-activos',     chatMensajes.usuariosArr );
    socket.emit('recibir-mensajes', chatMensajes.ultimos10 );

    // Conectarlo a una sala especial
    socket.join( usuario.id ); // global, socket.id, usuario.id
    

    // Limpiar cuando alguien se desconeta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', chatMensajes.usuariosArr );
    })

    socket.on('enviar-mensaje', ({ uid, mensaje }) => {
        
        if ( uid ) {
            // Mensaje privado
            socket.to( uid ).emit( 'mensaje-privado', { de: usuario.nombre, mensaje });
        } else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje );
            io.emit('recibir-mensajes', chatMensajes.ultimos10 );
        }

    })

    
}


module.exports = {
    socketController
}*/
