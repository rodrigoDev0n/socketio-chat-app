
// const socket = io('https://socketio-chat-app-production.up.railway.app/');
const socket = io('http://localhost:8080');

// Referencias
const form = document.querySelector('#formulario');
const mensajes = document.querySelector('#mensajes');
const txtmensaje = document.querySelector('#txtMensaje');
const txtUser = document.querySelector('#txtUserName');
const entranceText = document.querySelector('#messageAnnouncement');
const users = document.querySelector('#users');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newMsg = txtmensaje.value;
    const userName = txtUser.value;

    if(newMsg === "") return;
    if (userName === "") return;

    socket.emit('mensaje-to-server', { 
        text: newMsg,
        user: userName,
    });

    txtUser.disabled = true;
    txtmensaje.focus();
    txtmensaje.value = '';
});

socket.on('mensaje-from-server', (data) => {
    entranceText.style.cssText = 'display: none';
    mensajes.innerHTML += ` 
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto custom-text-container">
            <div class="fw-bold customtext">${data.user}<span class="fw-bold customtext"> > </span></div>
            <span>${data.text}</span>
        </div>
    </li>`;
    users.innerHTML = ''; 
});

txtmensaje.addEventListener('input', () => {
    socket.emit('user:typing', txtUser.value);
});

socket.on('user:typing', (data) => {
    users.innerHTML = `${data === '' ? 'alguien' : data} esta escribiendo ... <span class="animate">🔔</span>`;
});


/*         socket.on('mensaje-bienvenida', (data) => {
            console.log(data);
        }); */

/*         setTimeout(() => {
            socket.emit('mensaje-servidor', {
                msg: 'Cliente',
                nombre: 'Rodrigo'
            })
        }, 2000); */