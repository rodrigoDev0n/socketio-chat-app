
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        //Eventos que emiten y reciben los sockets
        this.io.on('connection', (socket) => {

            socket.on('mensaje-to-server', (data) => {
                this.io.emit('mensaje-from-server', data);
            });

            socket.on('user:typing', (data) => {
                socket.broadcast.emit('user:typing', data);
            });
        });
    }
}

module.exports = Sockets;