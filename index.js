//Requerimos nuestro archivo con el servidor
const Server = require('./models/server');
require('dotenv').config();

//Creamos una nueva instancia de nuestro servidor
const server = new Server();

//Ejecutamos nuestro servidor
server.execute();


/* 
// Creando socket server: 

const express = require('express');
// Servidor de express
const app = express();

// Servidor de socket:
const server = require('http').createServer(app);

// Configuración del socket server:
const io = require('socket.io')(server);

// Desplegar el directorio publico:
app.use( express.static( __dirname + '/public' ) )

io.on('connection', ( socket ) => { 
    console.log(socket.id);
     socket.emit('mensaje-bienvenida', {
        msg: 'Bienvenido al server',
        fecha: new Date()
    });

     socket.on('mensaje-to-server', (data) => {
        io.emit('mensaje-from-server', data);
     });
});

server.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8081');
}); */