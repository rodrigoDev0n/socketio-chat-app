
const express = require('express');
const http = require('http');

const socketio = require("socket.io");

const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //HTTP Server
        this.server = http.createServer(this.app);

        //Configuración de socket
        this.io = socketio(this.server, {/* Configuraciones */ });
    }

    middlewares() {
        // Desplegar el directorio publico:
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    socketsConfig() {
        new Sockets(this.io);
    }

    execute() {

        //Inicializa middlewares
        this.middlewares();

        //Inicializa sockets
        this.socketsConfig();

        //Inicializa servidor
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;