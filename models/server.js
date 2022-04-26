const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {

    constructor(){
        this.app = express ();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos 
        this.conectarDB();


        // Middlewares
        this.middelewares();

        //Rutas de mi Aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
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