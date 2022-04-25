const express = require("express");
const cors = require("cors");

class Server {

    constructor(){
        this.app = express ();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middelewares();

        //Rutas de mi Aplicacion
        this.routes();
    }

    middelewares(){

        //CORS
        this.app.use( cors() ); 
        
        //Lectura y parseo del Boby
        this.app.use(express.json());

        //direcctorio publico
        this.app.use(express.static('public'));
    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuariosRoutes'));

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port );
        });
    }
}

module.exports = Server;