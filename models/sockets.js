
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        //Eventos que emiten y reciben los sockets
        this.io.on('connection', ( socket ) => { 
            console.log(socket.id);
             socket.emit('mensaje-bienvenida', {
                msg: 'Bienvenido al server',
                fecha: new Date()
            });
        
             socket.on('mensaje-to-server', (data) => {
                this.io.emit('mensaje-from-server', data);
             });
        });
    }
}

module.exports = Sockets;